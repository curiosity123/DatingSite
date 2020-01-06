using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using DatingSite_API.Dtos;
using DatingSite_API.Models;

namespace DatingSite_API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>()
            .ForMember(destinationMember => destinationMember.PhotoUrl, opt =>
            {
                opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
            })
            .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));

            CreateMap<User, UserForDetailsDto>()
            .ForMember(destinationMember => destinationMember.PhotoUrl, opt =>
            {
                opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
            })
            .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));

            CreateMap<Photo, PhotosForDetailedDto>();
            CreateMap<UserForUpdateDto, User>();


            CreateMap<Photo, PhotosForDetailedDto>();
            CreateMap<PhotoForCreationDto, Photo>();
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<UserForRegisterDto, User>();
            CreateMap<MessageForCreationDto, Message>();
            CreateMap<MessageForCreationDto,Message>().ReverseMap();
            CreateMap<Message, MessageToReturnDto>()
            .ForMember(u=> u.SenderPhotoUrl , opt => opt.MapFrom(u=> u.Sender.Photos.FirstOrDefault(x=>x.IsMain).Url))
            .ForMember(u=> u.RecipientPhotoUrl , opt => opt.MapFrom(u=> u.Recipient.Photos.FirstOrDefault(x=>x.IsMain).Url));
        }
    }
}