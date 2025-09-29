import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  signal,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { PageFlip } from 'page-flip';

export interface Page {
  imageUrl: string;
  title: string;
}

@Component({
  selector: 'app-flipbook',
  standalone: true,
  templateUrl: './flipbook.component.html',
  styleUrls: ['./flipbook.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FlipbookComponent implements AfterViewInit {
  pages: Page[] = [
    { imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb', title: 'Misty Mountains' },
    { imageUrl: 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6', title: 'Forest Canopy' },
    { imageUrl: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e', title: 'Lakeside View' },
    { imageUrl: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d', title: 'Enchanted Woods' },
    { imageUrl: 'https://images.unsplash.com/photo-1758642882005-447873fd2d29', title: 'Autumn River Valley' },
    { imageUrl: 'https://images.unsplash.com/photo-1737039226838-fb0156d89672', title: 'Snow-Capped Peaks' },
    { imageUrl: 'https://images.unsplash.com/photo-1532274402910-a9919ad77bb5', title: 'Ocean Sunset' },
    { imageUrl: 'https://images.unsplash.com/photo-1510414704-5827ae6c82d5', title: 'Desert Dunes' },
    { imageUrl: 'https://images.unsplash.com/photo-1490750950660-cd2460c388a2', title: 'Rolling Hills' },
    { imageUrl: 'https://images.unsplash.com/photo-1549721759-96894d0c1e84', title: 'Starry Night Sky' },
    { imageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470', title: 'Blue Waterfall' },
    { imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02f23faa89', title: 'Coastal Path' },
    { imageUrl: 'https://images.unsplash.com/photo-1472214103133-fe39893d1819', title: 'Sunrise Field' },
    { imageUrl: 'https://images.unsplash.com/photo-1533108344127-b50f49348883', title: 'Volcano Landscape' },
  ];

  @ViewChild('book') bookElementRef!: ElementRef<HTMLDivElement>;
  private pageFlip: PageFlip | null = null;

  currentPage = signal(1);
  isLoaded = signal(false);

  private readonly PAGE_WIDTH = 400;
  private readonly PAGE_HEIGHT = 500;

  ngAfterViewInit(): void {
    try {
      const bookElement = this.bookElementRef.nativeElement;
      this.pageFlip = new PageFlip(bookElement, {
        width: this.PAGE_WIDTH,
        height: this.PAGE_HEIGHT,
        flippingTime: 800,
        maxShadowOpacity: 0.5,
        autoSize: true,
        startPage: 0,
      });

      this.pageFlip.loadFromImages(this.pages.map((p) => p.imageUrl));
      this.isLoaded.set(true);

      this.pageFlip.on('flip', (e: any) => {
        this.currentPage.set(e.data + 1);
      });
    } catch (e) {
      console.error('PageFlip initialization error:', e);
    }
  }

  nextPage(): void {
    if (this.pageFlip && this.pageFlip.getCurrentPageIndex() < this.pageFlip.getPageCount() - 1) {
      this.pageFlip.flipNext();
    }
  }

  prevPage(): void {
    if (this.pageFlip && this.pageFlip.getCurrentPageIndex() > 0) {
      this.pageFlip.flipPrev();
    }
  }
}
