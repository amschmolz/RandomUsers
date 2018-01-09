import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  name:FullName;
  dob:string;
  gender:string;
  location:Location;
  iconUrl:string;

  /**
   * Constructor for UserComponent. Takes a json object from the api
   * @param obj - the json object
   */
  constructor(@Inject(UserComponent) obj) {
    this.name = obj.name;
    this.dob = obj.dob;
    this.gender = obj.gender;
    this.location = obj.location;
    this.iconUrl = obj.picture.large;
  }

  /**
   * Return the location/nationality string or unknown if undefined
   */
  getLocation(){
    return typeof location === "undefined" ? "unknown" : this.location.city + ", " + this.location.state;
  }

  /**
   * Return the full name string with proper capitalization
   */
  getName(){
    return typeof name === "undefined" ? "unknown" : 
    this.capitalize(this.name.first) + " " + this.capitalize(this.name.last);
  }

  /**
   * Calculate the age based on the date of birth we got in the json response
   */
  getAge(){
    if(typeof this.dob === "undefined") return -1;
    var d = new Date();
    var current = [d.getFullYear(), d.getMonth() + 1, d.getDate()]; // +1 because month is 0-11
    var birthday = this.dob.split(" ")[0].split("-").map(v => parseInt(v)); //[1996, 4, 9]
    var age = current[0] - birthday[0];

    if(current[1] < birthday[1] || (current[1] == birthday[1] && current[2] < birthday[2])) {
      age--;
    }
    return age;
  }

  ngOnInit() {
    
  }

  /**
   * Helper function to capitalize strings
   * @param str - the string to capitalize
   */
  private capitalize(str:string){
    return str[0].toUpperCase() + str.slice(1);
  }
}

// interfaces to hold the data from the objects inside the json response
// to make the properties a bit cleaner
interface Location{
  city:string;
  postcode:number;
  state:string;
  street:string;
}

interface FullName{
  first:string;
  last:string;
  title:string;
}