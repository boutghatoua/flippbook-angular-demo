import { 
  Component, 
  AfterViewInit, 
  ViewChild, 
  ElementRef, 
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';

// Using the direct module import for PageFlip, as requested.
import { PageFlip } from 'page-flip';

// Interface provided by the user
export interface Page {
  imageUrl: string;
  title: string;
}


@Component({
  selector: 'app-root', 
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- The script tag for the CDN has been removed. -->
   
  `,
  styles: [`
  `],
})
// Class renamed to App as the main component
export class App implements AfterViewInit {
  
  // Data array provided by the user
  pages: Page[] = [
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
                size: "fixed",              
                flippingTime: 800,          
                maxShadowOpacity: 0.5,
                autoSize: true,             
                showPageControl: false,
                startPage: 0,               
                render: 'html' 
            }
        );

        this.pageFlip.load();
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
    if (this.pageFlip && this.pageFlip.hasNextPage()) {
      this.pageFlip.flipNext();
    }
  }

  /**
   * Flips to the previous page.
   */
  prevPage(): void {
    if (this.pageFlip && this.pageFlip.hasPrevPage()) {
      this.pageFlip.flipPrev();
    }
  }
}