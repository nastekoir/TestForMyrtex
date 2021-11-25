using Microsoft.AspNetCore.Mvc;
using MyrtexTest.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyrtexTest.Controllers
{
    [ApiController]
    [Route("api/employees")]
    public class EmployeeController : Controller
    {
        ApplicationContext db;
        
        public EmployeeController(ApplicationContext context)
        {
            db = context;
        }

        [HttpGet]
        public IEnumerable<Employee> GetAllEmployees()
        {
            return db.Employees.ToList();
        }

        [HttpGet("{id}")]
        public Employee GetEmployeeById(int id)
        {
            Employee employee = db.Employees.FirstOrDefault(empl => empl.Id == id);
            return employee;
        }

        [HttpPost]
        public IActionResult AddEmployee(Employee employee)
        {
            if (ModelState.IsValid)
            {
                db.Employees.Add(employee);
                db.SaveChanges();
                return Ok(employee);
            }
            return BadRequest(ModelState);
        }

        [HttpPut]
        public IActionResult UpdateEmployee(Employee employee)
        {
            if (ModelState.IsValid)
            {
                db.Update(employee);
                db.SaveChanges();
                return Ok(employee);
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteEmployeeById(int id)
        {
            Employee employee = db.Employees.FirstOrDefault(empl => empl.Id == id);
            if (employee != null)
            {
                db.Employees.Remove(employee);
                db.SaveChanges();
            }
            return Ok(employee);
        }
    }
}
