/// <reference path="../../../typings/angular2.d.ts" />

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
                var $linkContainer = $(this.el.nativeElement).parent().find('.link-container');
                var input = $linkContainer.find('input')[0];
                input.selectionStart = 0;
                input.selectionEnd = input.value.length;

                $linkContainer.click(function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                });

                break;

            default:
                var width = 600,
                    height = 400;

                if (this.data.name === 'reddit') {
                    width = 900;
                    height = 600;
                } else if (this.data.name === 'pinterest') {
                    width = 870;
                    height = 680;
                }

                var centerX = (window.outerWidth - width) / 2,
                    centerY = (window.outerHeight - height) / 2;

                window.open(
                    this.data.href,
                    '_blank',
                    'width=' + width + ',height=' + height + ',titlebar=0,left=' + centerX + ',top=' + centerY
                );

                break;
        }
    }
}