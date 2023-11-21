import { LoaderService } from './loader.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoaderService],
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    const service: LoaderService = TestBed.inject(LoaderService);
    expect(service).toBeTruthy();
  });

  describe('#show()', () => {
    it('should trigger show function', () => {
      expect(service.show()).toBeFalsy();
    });
  });

  describe('#hide()', () => {
    it('should trigger hide function', () => {
      expect(service.hide()).toBeFalsy();
    });
  });

  //spinner$.subscribe();

  describe('#spinner()', () => {
    it('returned Observable should match the right data', () => {
      let mock: any;

      service.spinner$.subscribe((res) => {
        mock = res;
        expect(mock).toBeFalsy();
      });
    });
  });
});
