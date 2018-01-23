import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { Quote } from '../../data/quote.interface';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { AlertController } from 'ionic-angular';
import { QuotesService } from '../../services/quotes';

@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html',
})
export class QuotesPage implements OnInit {
  quoteGroup: {category: string, quotes: Quote[], icon: string};

  constructor(
    private navParams: NavParams, 
    private alertCtrl: AlertController,
    private quoteService: QuotesService
  ){}
    ngOnInit(){
      this.quoteGroup = this.navParams.data;
    }

    onAddToFavourite(selectedQuote: Quote){
      const alert = this.alertCtrl.create({
        title: 'Add Quote',        
        message: 'Are you sure you want to add the quote?',
        buttons: [
          {
           text:'Ok',
           handler: () =>{
             this.quoteService.addQuoteToFavourites(selectedQuote);
           }
          },
          {
            text:'Nope',
            role: 'cancel',
            handler: () =>{
              console.log('Cancelled');
            }
          }
        ]      
      });
      alert.present();
    }
}