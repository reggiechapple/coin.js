/**
 * Seed the database
 */

const User = require("../models/User");
const Customer = require("../models/Customer");
const Driver = require("../models/Driver");
const Vendor = require("../models/Vendor");

const Product = require("../models/Product");
const e = require("express");

function seedUsers() {
  // create some users
  const users = [
    {
      info: {
        username: 'sammybear@local.com',
        name: 'Samantha Bear',
        role: 'Customer',
        avatar: '/uploads/1603670282517.jpg'
      },
      password: 'P@ss1234'
    },
    {
      info: {
        username: 'luluwright@local.com',
        name: 'Lulu Wright',
        role: 'Vendor',
        avatar: '/uploads/1603670828264.png'
      },
      password: 'P@ss1234'
    },
    {
      info: {
        username: 'jmortimer@local.com',
        name: 'John Mortimer',
        role: 'Driver',
        avatar: '/uploads/1603724041997.jpg'
      },
      password: 'P@ss1234'
    },
  ];

  // use the Event model to insert/save
  for (user of users) {
    var newUser = new User(user.info);

    User.register(newUser, user.password, (err, user) => {
      if (err) {
        console.log(err);
      }
      else {
        if (user.role === "Driver") {
          Driver.create({ identity: user }, (err, driver) => {
            if (err) {
              console.log(err);
            } else {
              user.driver = driver;
              user.save();
            }
          });
        }

        if (user.role === "Customer") {
          Customer.create({ identity: user }, (err, customer) => {
            if (err) {
              console.log(err);
            } else {
              user.customer = customer;
              user.save();
            }
          });
        }

        if (user.role === "Vendor") {
          Vendor.create({ identity: user, companyName: "Lulu Gifts", status: "ACTIVE" }, (err, vendor) => {
            if (err) {
              console.log(err);
            } else {
              user.vendor = vendor;
              user.save();
            }
          });
        }
      }
    });
  }

  // seeded!
  console.log('Database seeded!');
}

function seedVendors() {
  // create some users
  const users = [
    {
      info: {
        username: 'bianca@local.com',
        name: 'Bianca Andrade',
        role: 'Vendor',
        avatar: '/images/homecarfted/vendors/Bianca Andrade.jpg'
      },
      password: 'P@ss1234'
    },
    {
      info: {
        username: 'cory@local.com',
        name: 'Cory Good',
        role: 'Vendor',
        avatar: '/images/homecarfted/vendors/Cory Good.jpg'
      },
      password: 'P@ss1234'
    },
    {
      info: {
        username: 'reuben@local.com',
        name: 'Reuben Whitaker',
        role: 'Vendor',
        avatar: '/images/homecarfted/vendors/Reuben Whitaker.jpg'
      },
      password: 'P@ss1234'
    },
    {
      info: {
        username: 'sean@local.com',
        name: 'Sean Gill',
        role: 'Vendor',
        avatar: '/images/homecarfted/vendors/Sean Gill.jpg'
      },
      password: 'P@ss1234'
    },
  ];

  // use the Event model to insert/save
  for (user of users) {
    var newUser = new User(user.info);

    User.register(newUser, user.password, (err, user) => {
      if (err) {
        console.log(err);
      }
      else {
        Vendor.create({ identity: user, companyName: `${user.name}'s Food`, status: "ACTIVE" }, (err, vendor) => {
          if (err) {
            console.log(err);
          } else {
            user.vendor = vendor;
            user.save();
          }
        });
      }
    });
  }

  // seeded!
  console.log('Vendors seeded!');
}

function seedCustomers() {
  // create some users
  const users = [
    {
      info: {
        username: 'ana@local.com',
        name: 'Ana French',
        role: 'Customer',
        avatar: '/images/homecarfted/customers/Ana French.jpg'
      },
      password: 'P@ss1234'
    },
    {
      info: {
        username: 'asaka@local.com',
        name: 'Asaka Ai',
        role: 'Customer',
        avatar: '/images/homecarfted/customers/Asaka Ai.jpg'
      },
      password: 'P@ss1234'
    },
    {
      info: {
        username: 'brandy@local.com',
        name: 'Brandy Grant',
        role: 'Customer',
        avatar: '/images/homecarfted/customers/Brandy Grant.jpg'
      },
      password: 'P@ss1234'
    },
    {
      info: {
        username: 'cynthia@local.com',
        name: 'Cynthia Reynolds',
        role: 'Customer',
        avatar: '/images/homecarfted/customers/Cynthia Reynolds.jpg'
      },
      password: 'P@ss1234'
    },
    {
      info: {
        username: 'erin@local.com',
        name: 'Erin Steele',
        role: 'Customer',
        avatar: '/images/homecarfted/customers/Erin Steele.jpg'
      },
      password: 'P@ss1234'
    },
    {
      info: {
        username: 'evelyn@local.com',
        name: 'Evelyn Fernandez',
        role: 'Customer',
        avatar: '/images/homecarfted/customers/Evelyn Fernandez.jpg'
      },
      password: 'P@ss1234'
    },
    {
      info: {
        username: 'isabel@local.com',
        name: 'Isabel Francis',
        role: 'Customer',
        avatar: '/images/homecarfted/customers/Isabel Francis.jpg'
      },
      password: 'P@ss1234'
    },
    {
      info: {
        username: 'sam@local.com',
        name: 'Sam Un-Ju',
        role: 'Customer',
        avatar: '/images/homecarfted/customers/Sam Un-Ju.jpg'
      },
      password: 'P@ss1234'
    },
    {
      info: {
        username: 'tasha@local.com',
        name: 'Tasha Blair',
        role: 'Customer',
        avatar: '/images/homecarfted/customers/Tasha Blair.jpg'
      },
      password: 'P@ss1234'
    },
  ];

  // use the Event model to insert/save
  for (user of users) {
    var newUser = new User(user.info);

    User.register(newUser, user.password, (err, user) => {
      if (err) {
        console.log(err);
      }
      else {
        Customer.create({ identity: user }, (err, customer) => {
          if (err) {
            console.log(err);
          } else {
            user.customer = customer;
            user.save();
          }
        });
      }
    });
  }

  // seeded!
  console.log('Customers seeded!');
}

function seedDrivers() {
  // create some users
  const users = [
    {
      info: {
        username: 'morgan@local.com',
        name: 'Morgan Dean',
        role: 'Driver',
        avatar: '/images/homecarfted/drivers/Morgan Dean.jpg'
      },
      password: 'P@ss1234'
    },
    {
      info: {
        username: 'thomas@local.com',
        name: 'Thomas Mcknight',
        role: 'Driver',
        avatar: '/images/homecarfted/drivers/Thomas Mcknight.jpg'
      },
      password: 'P@ss1234'
    }
  ];

  // use the Event model to insert/save
  for (user of users) {
    var newUser = new User(user.info);

    User.register(newUser, user.password, (err, user) => {
      if (err) {
        console.log(err);
      }
      else {
        Driver.create({ identity: user }, (err, driver) => {
          if (err) {
            console.log(err);
          } else {
            user.driver = driver;
            user.save();
          }
        });
      }
    });
  }

  // seeded!
  console.log('Drivers seeded!');
}

function seedProducts() {

  var baconChsBrgr = {
    name: "Bacon Cheese Burger Meal",
    price: 8.69,
    images: [
      "/images/homecarfted/products/burger1/burger-3962996_1280.jpg",
      "/images/homecarfted/products/burger1/burger-3962997_1280.jpg"
    ]
  };

  Product.create(baconChsBrgr, (err, product) => {
    if (err) {
      console.log(err);
    }
    else {
      Vendor.findOne({ companyName: { $eq: "Sean Gill's Food" } }, (err, vendor) => {
        if (err) {
          console.log(err);
        }
        else {
          product.vendor = vendor;
          product.save();

          vendor.products.push(product);
          vendor.save();
        }
      });
    }
  });

  var chsBrgr = {
    name: "Cheese Burger Meal",
    price: 6.99,
    images: [
      "/images/homecarfted/products/burger2/burger-4374614_1280.jpg",
      "/images/homecarfted/products/burger2/burger-4379863_1280.jpg"
    ]
  };

  Product.create(chsBrgr, (err, product) => {
    if (err) {
      console.log(err);
    }
    else {
      Vendor.findOne({ companyName: { $eq: "Cory Good's Food" } }, (err, vendor) => {
        if (err) {
          console.log(err);
        }
        else {
          product.vendor = vendor;
          product.save();

          vendor.products.push(product);
          vendor.save();
        }
      });
    }
  });

  var tacos = {
    name: "Fresh Tacos",
    price: 7.00,
    images: [
      "/images/homecarfted/products/tacos/mexico-1621835_1280.jpg",
      "/images/homecarfted/products/tacos/tacos-1613795_1280.jpg"
    ]
  };

  Product.create(tacos, (err, product) => {
    if (err) {
      console.log(err);
    }
    else {
      Vendor.findOne({ companyName: { $eq: "Bianca Andrade's Food" } }, (err, vendor) => {
        if (err) {
          console.log(err);
        }
        else {
          product.vendor = vendor;
          product.save();

          vendor.products.push(product);
          vendor.save();
        }
      });
    }
  });

  var pancakes = {
    name: "Pancakes",
    price: 7.00,
    images: [
      "/images/homecarfted/products/pancakes/pancake-1984693_1280.jpg",
      "/images/homecarfted/products/pancakes/pancake-1984705_1280.jpg",
      "/images/homecarfted/products/pancakes/pancake-1984712_1280.jpg",
      "/images/homecarfted/products/pancakes/pancake-1984716_1280.jpg",
    ]
  };

  Product.create(pancakes, (err, product) => {
    if (err) {
      console.log(err);
    }
    else {
      Vendor.findOne({ companyName: { $eq: "Reuben Whitaker's Food" } }, (err, vendor) => {
        if (err) {
          console.log(err);
        }
        else {
          product.vendor = vendor;
          product.save();

          vendor.products.push(product);
          vendor.save();
        }
      });
    }
  });

}

let seeder = {
  users: seedUsers,
  vendors: seedVendors,
  customers: seedCustomers,
  drivers: seedDrivers,
  products: seedProducts
}

module.exports = seeder;