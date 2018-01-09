import { Component, OnInit } from '@angular/core';
import { UserComponent } from './components/user/user.component';
import { DataService } from './services/data.service';
import $ from "jquery";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  users:UserComponent[] = [];

  /**
   * Constructor for the main AppComponent
   * @param ds - the service we'll make the api calls from
   */
  constructor(private ds:DataService) {

  }

  /**
   * Return the filtered list of users based off some user input
   * @param nameFilter - the name query used to filter by name
   * @param male - boolean that determines if we show males
   * @param female - boolean that determines if we show females
   */
  getUsers(nameFilter, male, female){
    var genderSorted = this.users.filter(v => (!male && v.gender === "male") || (!female && v.gender === "female"));
    if(typeof nameFilter === "undefined" || nameFilter === "") return genderSorted;

    nameFilter = nameFilter.toLowerCase();
    return genderSorted.filter(v => {
      var first = v.name.first.toLowerCase();
      var last = v.name.last.toLowerCase();

      return first.startsWith(nameFilter) || last.startsWith(nameFilter);
    });
  }

  /**
   * Add a certain amount of UserComponent's to the users array
   * @param i - how many users we should add to the list
   */
  addUsers(i=5){
    this.ds.getUsers(i).map(res => res.json()).forEach(resJson => {
      resJson.results.forEach(userObject => {
        this.users.push(new UserComponent(userObject));
      });
    });
  }

  ngOnInit() {
    this.addUsers();
    window.addEventListener('scroll', this.scroll, true);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }

  /**
   * On scroll, check if we're near the bottom. If so, add another user
   */
  scroll = (): void => {
    if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
      this.addUsers(1);
    }
  };

}