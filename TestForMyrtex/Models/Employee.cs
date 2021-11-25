using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace MyrtexTest.Models
{
    public partial class Employee
    {
        public int Id { get; set; }
        public string Department { get; set; }
        public string FullName { get; set; }
        public DateTime DateOfBirth { get ; set; }
        public DateTime DateOfEmployment { get; set; }
        public decimal Salary { get; set; }
    }
}
