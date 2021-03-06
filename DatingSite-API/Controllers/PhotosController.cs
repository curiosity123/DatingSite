using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using DatingSite_API.Data;
using DatingSite_API.Dtos;
using DatingSite_API.Helpers;
using DatingSite_API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace DatingSite_API.Controllers
{
    [Authorize]
    [Route("api/users/{userId}/photos")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IUserRepository _repo;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinarySettings;
        private Cloudinary _cloudinary;

        public PhotosController(IUserRepository repo, IMapper mapper, IOptions<CloudinarySettings> cloudinarySettings)
        {
            _cloudinarySettings = cloudinarySettings;
            _mapper = mapper;
            _repo = repo;


            Account account = new Account(
                _cloudinarySettings.Value.my_cloud_name,
                _cloudinarySettings.Value.my_api_key,
                _cloudinarySettings.Value.my_api_secret
            );

            _cloudinary = new Cloudinary(account);
        }


        [HttpPost]
        public async Task<IActionResult> AddPhotoForUser(int userId, [FromForm] PhotoForCreationDto photo)
        {


            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _repo.GetUser(userId);

            var file = photo.File;
            var uploadResult = new ImageUploadResult();
            var param = new ImageUploadParams();

            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    param = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
                    };

                    uploadResult = _cloudinary.Upload(param);
                }
            }
            photo.Url = uploadResult.Uri.ToString();
            photo.CloudinaryId = uploadResult.PublicId;

            var mappedPhoto = _mapper.Map<Photo>(photo);


            if (userFromRepo.Photos.Any(p => p.IsMain))
                mappedPhoto.IsMain = false;
            else
                mappedPhoto.IsMain = true;

            userFromRepo.Photos.Add(mappedPhoto);

            if (await _repo.SaveAll())
            {
                var returnPhoto = _mapper.Map<PhotoForReturnDto>(mappedPhoto);
                return CreatedAtRoute("GetPhoto", new { id = returnPhoto.Id }, returnPhoto);
            }

            return BadRequest("Adding photo failed!");
        }


        [HttpGet("id", Name = "GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id)
        {
            var photoFromRepo = await _repo.GetPhoto(id);
            var photoForReturn = _mapper.Map<PhotoForReturnDto>(photoFromRepo);
            return Ok(photoForReturn);
        }

        [HttpDelete("{id}/deletePhoto")]
        public async Task<IActionResult> deletePhoto(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var user = await _repo.GetUser(userId);

            if (await _repo.GetPhoto(id) == null)
                return Unauthorized();

            var photo = await _repo.GetPhoto(id);


            if (photo != null)
            {
                if (photo.IsMain)
                    return BadRequest("You can't delete main photo :(");




                DeletionParams param = new DeletionParams(photo.CloudinaryId);
                var result = await _cloudinary.DestroyAsync(param);

                if (result.Result == "ok")
                {
                    var res = user.Photos.Remove(photo);

                    if (!res || !await _repo.SaveAll())
                        return BadRequest("Remove photo method failed");
                }
                else
                    return BadRequest("Photo not exist!");
            }

            return Ok();
        }

        [HttpPost("{id}/setMain")]
        public async Task<IActionResult> setMainPhoto(int userId, int id)
        {

            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var user = await _repo.GetUser(userId);

            if (await _repo.GetPhoto(id) == null)
                return Unauthorized();

            var photo = await _repo.GetPhoto(id);

            if (photo.IsMain)
                return BadRequest();
            else
            {
                var otherPhotos = user.Photos.Where(x => x.IsMain);
                foreach (var p in otherPhotos)
                {
                    p.IsMain = false;
                }

                photo.IsMain = true;
                if (!await _repo.SaveAll())
                    return BadRequest("Main photo set error");
            }

            return Ok();
        }

    }
}