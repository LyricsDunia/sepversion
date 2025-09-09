class ProductModel {
  constructor(db) {
    this.collection = db.collection('products');
  }

  async create(productData) {
    const product = {
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const result = await this.collection.insertOne(product);
    return { ...product, _id: result.insertedId };
  }

  async findAll(filters = {}, options = {}) {
    const { limit = 20, sort = { createdAt: -1 } } = options;
    return await this.collection
      .find(filters)
      .sort(sort)
      .limit(limit)
      .toArray();
  }

  async findById(id) {
    return await this.collection.findOne({ _id: id });
  }

  async update(id, updateData) {
    const result = await this.collection.updateOne(
      { _id: id },
      { $set: { ...updateData, updatedAt: new Date() } }
    );
    return result.modifiedCount > 0;
  }

  async delete(id) {
    const result = await this.collection.deleteOne({ _id: id });
    return result.deletedCount > 0;
  }

  async search(query) {
    return await this.collection
      .find({
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { category: { $regex: query, $options: 'i' } },
          { brand: { $regex: query, $options: 'i' } }
        ]
      })
      .toArray();
  }
}

module.exports = ProductModel;