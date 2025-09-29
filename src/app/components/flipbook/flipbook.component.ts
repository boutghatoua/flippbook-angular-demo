import { 
  Component, 
  AfterViewInit, 
  ViewChild, 
  ElementRef, 
  signal,
  ChangeDetectionStrategy,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';

// Using the direct module import for PageFlip, as requested.
import { PageFlip } from 'page-flip';

export interface Page {
  imageUrl: string;
  title: string;
}


@Component({
  selector: 'app-flipbook',
  standalone: true,
  imports: [],
  
  templateUrl: './flipbook.component.html',
  styleUrl: './flipbook.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FlipbookComponent {

 pages: Page[]  = [
  {
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    title: 'Misty Mountains'
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6',
    title: 'Forest Canopy'
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e',
    title: 'Lakeside View'
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d',
    title: 'Enchanted Woods'
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1758642882005-447873fd2d29',
    title: 'Autumn River Valley'
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1737039226838-fb0156d89672',
    title: 'Snow-Capped Peaks'
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1532274402910-a9919ad77bb5',
    title: 'Ocean Sunset'
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1510414704-5827ae6c82d5',
    title: 'Desert Dunes'
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1490750950660-cd2460c388a2',
    title: 'Rolling Hills'
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1549721759-96894d0c1e84',
    title: 'Starry Night Sky'
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
    title: 'Blue Waterfall'
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02f23faa89',
    title: 'Coastal Path'
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1472214103133-fe39893d1819',
    title: 'Sunrise Field'
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1533108344127-b50f49348883',
    title: 'Volcano Landscape'
  }
];


// Get a reference to the 'book' div element
@ViewChild('book') bookElementRef!: ElementRef<HTMLDivElement>;
  
// State for the PageFlip instance
// Note: PageFlip is imported as a type, its runtime availability depends on module resolution.
private pageFlip: PageFlip | null = null;

// Signals for tracking the current state
currentPage = signal(1); 
isLoaded = signal(false);

// Configuration constants
private readonly PAGE_WIDTH = 400; 
private readonly PAGE_HEIGHT = 500;

ngAfterViewInit(): void {
  // Initialization is synchronous since we are using module import.
  try {
      const bookElement = this.bookElementRef.nativeElement;

      // Initialize PageFlip using the imported constructor
      this.pageFlip = new PageFlip(
          bookElement,
          {
              width: this.PAGE_WIDTH,     
              height: this.PAGE_HEIGHT,            
              flippingTime: 800,          
              maxShadowOpacity: 0.5,
              autoSize: true,        
              startPage: 0, 
          }
      );

      // Removed the call to 'load' as it does not exist on 'PageFlip'.
      this.pageFlip.loadFromImages(this.pages.map(page => page.imageUrl));
      this.isLoaded.set(true);

      // Synchronize Angular state with PageFlip events
      // Note: Using 'any' for the event payload as PageFlip event types are custom.
      this.pageFlip.on('flip', (e: any) => { 
          this.currentPage.set(e.data + 1); // e.data is 0-indexed page number
      });

      console.log('PageFlip initialized successfully via module import.');
      
  } catch (e) {
      // This catch block will handle the error if the module resolution still fails at runtime.
      console.error('An error occurred during PageFlip initialization. If using a constrained environment, this may indicate a failure to load the NPM package:', e);
  }
}

/**
 * Flips to the next page.
 */
nextPage(): void {
  if (this.pageFlip && this.pageFlip.getCurrentPageIndex() < this.pageFlip.getPageCount() - 1) {
    this.pageFlip.flipNext();
  }
}

/**
 * Flips to the previous page.
 */
prevPage(): void {
  if (this.pageFlip && this.pageFlip.getCurrentPageIndex() > 0) {
    this.pageFlip.flipPrev();
  }
}

}
