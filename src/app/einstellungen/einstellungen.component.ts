import { Component, OnInit } from '@angular/core';
import{BackendcommService} from '../services/backendcomm.service';  //service importieren


@Component({
  selector: 'app-einstellungen',
  templateUrl: './einstellungen.component.html',
  styleUrls: ['./einstellungen.component.scss']
})
export class EinstellungenComponent implements OnInit {

  constructor(private service: BackendcommService) { }              //Service einfügen

public userid = '';
public name = '';
public avatar = '../assets/' + 'img_avatar4.png';


//*****************************************GET BEFEHL*************************************************/
  ngOnInit(): void {
      this.service.getData()
  
      .then(res => {
        // Success
        this.name = res['products'][1]['name'];
        this.userid = res['products'][1]['product_url'];
        //this.avatar = '../assets/' + res['user']['avatar'];
        console.log(res['products']);
        })
        
        .catch(error =>{
          console.log(error +' Keine userdaten')                  //error werfen
        })                                                        //resolve-> gehts in then bei catch also fehler reject
  
    
  }


  test(){
    this.service.getData()

    .then(res => {
      // Success
      console.log(res);
      })
      
      .catch(error =>{
        console.log(error +' Keine userdaten')                    //error werfen
      })                                                          //resolve-> gehts in then bei catch also fehler reject

  }
}