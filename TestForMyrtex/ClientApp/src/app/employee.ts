export class Employee {
    constructor(
        public id?: number,
        public department?: string,
        public fullName?: string,
        public dateOfBirth?: Date,
        public dateOfEmployment?: Date,
        public salary?: number) { }
}