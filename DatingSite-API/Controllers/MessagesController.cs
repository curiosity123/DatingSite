using System;
using System.Collections;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingSite_API.Data;
using DatingSite_API.Dtos;
using DatingSite_API.Helpers;
using DatingSite_API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingSite_API.Controllers
{

    [ServiceFilter(typeof(LogUserActivity))]
    [Authorize]
    [Route("api/users/{userId}/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {

        private readonly IUserRepository _repo;
        private readonly IMapper _mapper;

        public MessagesController(IUserRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;

        }


        [HttpGet("{id}", Name = "GetMessage")]

        public async Task<IActionResult> GetMessage(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();


            var message = await _repo.GetMessage(id);
            if (message == null)
                return NoContent();

            return Ok();
        }




        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteMessage(int id, int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var message = await _repo.GetMessage(id);
            if (message == null)
                return NoContent();

            if (message.SenderId == userId)
                message.SenderDeleted = true;
            else
                message.RecipientDeleted = true;


            if (message.RecipientDeleted && message.SenderDeleted)
            {
                _repo.Delete(message);

            }

            if (await _repo.SaveAll())
                return NoContent();


            throw new System.Exception("remove message error");
        }


        [HttpPost()]
        public async Task<IActionResult> CreateMessage(int userId, MessageForCreationDto messageForCreationDto)
        {


            var sender = await _repo.GetUser(userId);
            if (sender.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            messageForCreationDto.SenderId = userId;
            var recipient = await _repo.GetUser(messageForCreationDto.RecipientId);

            if (recipient == null)
                return BadRequest("Cannot find user");

            var message = _mapper.Map<Message>(messageForCreationDto);
            _repo.Add(message);



            if (await _repo.SaveAll())
            {
                var messageForReturn = _mapper.Map<MessageToReturnDto>(message);
                return CreatedAtRoute("GetMessage", new { id = message.Id }, messageForReturn);
            }

            return BadRequest("saving error");
        }


        [HttpGet]
        public async Task<IActionResult> GetMessageForUser(int userId, [FromQuery] MessageParams messageParams)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            messageParams.UserId = userId;
            var messagesFromRepo = await _repo.GetMessageForUser(messageParams);
            var messageToReturn = _mapper.Map<IEnumerable<MessageToReturnDto>>(messagesFromRepo);

            Response.AddPagination(messagesFromRepo.CurrentPage, messagesFromRepo.PageSize, messagesFromRepo.TotalCount, messagesFromRepo.TotalPages);

            foreach (var m in messageToReturn)
            {
                m.MessageContainer = messageParams.MessageContainer;
            }

            return Ok(messageToReturn);

        }


        [HttpGet("conversation/{recipientId}")]
        public async Task<IActionResult> GetConversation(int userId, int recipientId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var messagesFromRepo = await _repo.GetConversation(userId, recipientId);
            var messageToReturn = _mapper.Map<IEnumerable<MessageToReturnDto>>(messagesFromRepo);

            return Ok(messageToReturn);

        }

        [HttpPost("{id}/read")]
        public async Task<IActionResult> MarkMessageAsRead(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            Message message = await _repo.GetMessage(id);

            if (message.RecipientId != userId)
                return Unauthorized();

            message.IsRead = true;
            message.DateRead = DateTime.Now;

            if (await _repo.SaveAll())
                return Ok();


            return BadRequest("saving error");


        }

    }
}