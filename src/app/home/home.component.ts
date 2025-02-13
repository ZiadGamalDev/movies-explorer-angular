import { Component } from '@angular/core';
import { RequestsService } from '../core/service/requests.service';
import { CommonModule } from '@angular/common';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { RouterModule } from '@angular/router';
import { UpToTopComponent } from "../up-to-top/up-to-top.component";

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, UpToTopComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [
    trigger('expandCollapse', [
      state(
        'collapsed',
        style({ height: '0px', opacity: 0, overflow: 'hidden' })
      ),
      state('expanded', style({ height: '*', opacity: 1 })),
      transition('collapsed <=> expanded', animate('300ms ease-in-out')),
    ]),
  ],
})
export class HomeComponent {
  movies: any[] = [];

  constructor(private request: RequestsService) {}

  ngOnInit(): void {
    this.getTrendingMovies();
  }

  getTrendingMovies() {
    this.request.getTrendingMovies().subscribe((res: any) => {
      this.movies = res.results;
    });
  }

  getBackgroundImage(): string {
    return 'assets/Home.jpg';
  }

  chunkSize = 5;

  getMovieChunks() {
    let chunks = [];
    let allMovies = [...this.movies, ...this.movies];

    for (let i = 0; i < allMovies.length; i += this.chunkSize) {
      chunks.push(allMovies.slice(i, i + this.chunkSize));
    }

    return chunks;
  }

  activeIndex: number | null = null;

  faqs = [
    {
      question: 'What is Netflix?',
      answer: `Netflix is a streaming service that offers a wide variety of 
               award-winning TV shows, movies, anime, documentaries, and more 
               on thousands of internet-connected devices.
               You can watch as much as you want, whenever you want without a 
               single commercial – all for one low monthly price. 
               There's always something new to discover and new TV shows and movies are added every week!`,
      isOpen: false,
    },
    {
      question: 'How much does Netflix cost?',
      answer: `Netflix offers different pricing plans depending on your needs.
               Prices vary based on the quality of streaming and the number of 
               screens you can watch on at the same time.
               You can visit the official Netflix website to check the latest pricing details.`,
      isOpen: false,
    },
    {
      question: 'Where can I watch?',
      answer: `You can watch Netflix anywhere, anytime, on an unlimited number of devices.
               Sign in with your Netflix account to watch instantly on the web at netflix.com from your 
               personal computer or on any internet-connected device that offers the Netflix app, 
               such as smart TVs, smartphones, tablets, streaming media players, and game consoles.`,
      isOpen: false,
    },
    {
      question: 'How do I cancel?',
      answer: `Netflix is flexible. There are no annoying contracts and no commitments. 
               You can easily cancel your account online in just two clicks. 
               There are no cancellation fees – start or stop your account anytime.`,
      isOpen: false,
    },
    {
      question: 'What can I watch on Netflix?',
      answer: `Netflix has an extensive library of feature films, documentaries, TV shows, anime, 
               award-winning Netflix originals, and more. 
               You can browse a wide variety of genres including action, comedy, drama, horror, and sci-fi. 
               There's always something new to watch, and Netflix frequently adds new content every month!`,
      isOpen: false,
    },
    {
      question: 'Is Netflix good for kids?',
      answer: `Yes! Netflix offers a Kids profile feature that allows children to have a 
               safe viewing experience with family-friendly content. 
               Parents can also use parental controls to restrict certain content and set viewing limits. 
               Netflix Kids has a wide variety of animated movies, educational shows, and popular kids’ series.`,
      isOpen: false,
    },
  ];

  toggleFaq(index: number) {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }
}
