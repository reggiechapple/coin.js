
class Repository {

    constructor(Model) {
        this.Model = Model;
    }

    create(newObj, cb) {
        this.Model.create(newObj, cb);
    }

    collection(cb) {
        this.Model.find({}, cb);
    }

    single(id, cb) {
        this.Model.findById(id, cb);
    }

    update(id, cb) {
        this.Model.findByIdAndUpdate(id, cb);
    }

    delete(id, cb) {
        this.Model.findByIdAndDelete(id, cb);
    }

}

module.exports = Repository;