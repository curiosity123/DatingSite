using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PortalRandkowy.API.Data;
using PortalRandkowy.API.Models;

namespace PortalRandkowy.API.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly DataContext _context;

        public ValuesController(DataContext context)
        {
            _context = context;
        }


        [HttpGet]
        public ActionResult Get()
        {
            var values = _context.Values.ToList();
            return Ok(values);
        }

        [HttpGet("{id}")]
        public ActionResult GetValue(int id)
        {
            var values = _context.Values.FirstOrDefault(x => x.Id == id);
            return Ok(values);
        }



        [HttpPost]
        public IActionResult AddValue([FromBody] Value value)
        {
            _context.Add(value);
            _context.SaveChanges();
            return Ok(value);
        }


        [HttpPut("{id}")]
        public IActionResult EditValue(int id, [FromBody] Value value)
        {
            var data = _context.Values.Find(id);
            data.Name = value.Name;
            _context.Values.Update(data);
            _context.SaveChanges();
            return Ok(value);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteValue(int id)
        {
            var data = _context.Values.Find(id);
            _context.Values.Remove(data);
            _context.SaveChanges();
            return Ok();
        }


    }
}
