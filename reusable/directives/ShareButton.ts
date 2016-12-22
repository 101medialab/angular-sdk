import {Directive, Input, ElementRef} from '@angular/core';

@Directive({
    selector: '[share-button]',
    host: {
        '(click)': 'onClick($event)',
    }
})
export class ShareButton {
    @Input('share-button') data: { name: string, href: string };

    constructor(private el: ElementRef) {}

    onClick(evt) {
        if (typeof ga !== 'undefined') {
            ga('send', 'social', this.data.name, this.data.name, this.data.href);
        }

        switch (this.data.name) {
            case 'email':
                break;

            case 'link':
                let $linkContainer = $(this.el.nativeElement).parent().find('.link-container'),
                    input =  (<HTMLInputElement>$linkContainer.find('input')[0]);
                input.selectionStart = 0;
                input.selectionEnd = input.value.length;

                $linkContainer.click(function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                });

                break;

            default:
                let width = 600,
                    height = 400;

                switch (this.data.name) {
                    case 'reddit':
                        width = 900;
                        height = 600;
                        break;

                    case 'pinterest':
                        width = 870;
                        height = 680;
                        break;
                }

                window.open(
                    this.data.href,
                    '_blank',
                    'width=' + width + ',height=' + height + ',titlebar=0,left=' + (
                        (window.outerWidth - width) / 2
                    ) + ',top=' + (
                        (window.outerHeight - height) / 2
                    )
                );

                break;
        }
    }
}