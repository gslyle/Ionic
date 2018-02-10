import { Component } from '@angular/core';
import { Quote } from '../../data/quote.interface';
import { QuotesService } from '../../services/quotes';
import { ModalController } from 'ionic-angular';
import { QuotePage } from '../quote/quote';

@Component({
  selector: 'page-favourites',
  templateUrl: 'favourites.html',
})
export class FavouritesPage {
  quotes: Quote[];

  constructor (private quotesService: QuotesService, private modalCtrl:ModalController){}

  ionViewWillEnter(){
    this.quotes = this.quotesService.getFavouriteQuotes();
  }

  onViewQuote(quote: Quote){
    const modal = this.modalCtrl.create(QuotePage, quote);
    modal.present();
    modal.onDidDismiss( (remove:boolean) => {
      if (remove) {
        this.quotesService.removeQuoteToFavourites(quote);
        this.quotes = this.quotesService.getFavouriteQuotes();
      }
    });
  }
}
