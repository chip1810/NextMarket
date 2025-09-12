import { Test, TestingModule } from '@nestjs/testing';
import { ProductCollectionController } from './product_collection.controller';
import { ProductCollectionService } from './product_collection.service';

describe('ProductCollectionController', () => {
  let controller: ProductCollectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductCollectionController],
      providers: [ProductCollectionService],
    }).compile();

    controller = module.get<ProductCollectionController>(
      ProductCollectionController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
