/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { StoreTestModule } from '../../../test.module';
import { ProductComponent } from '../../../../../../main/webapp/app/entities/product/product.component';
import { ProductService } from '../../../../../../main/webapp/app/entities/product/product.service';
import { Product } from '../../../../../../main/webapp/app/entities/product/product.model';

describe('Component Tests', () => {

    describe('Product Management Component', () => {
        let comp: ProductComponent;
        let fixture: ComponentFixture<ProductComponent>;
        let service: ProductService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StoreTestModule],
                declarations: [ProductComponent],
                providers: [
                    ProductService
                ]
            })
            .overrideTemplate(ProductComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Product(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.products[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
