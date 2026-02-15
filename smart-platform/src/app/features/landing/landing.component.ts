import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  readonly title = 'Smart financial services platform (ITR first)';
  readonly subtitle =
    'Start with guided ITR filing now, then expand into more financial workflows as your needs grow.';
}
