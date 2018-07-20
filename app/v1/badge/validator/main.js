let validator = {};

validator.getBadge =
{
  id : {
    presence: true
  },
  userId : {
    presence: true
  }
}

validator.create =
{
  name: {
    presence: true
  },
  description : {
    presence: true
  },
  img : {
    presence: true
  }
}

validator.update =
{
   id : {
    presence: true
  },
  name: {
    presence: true
  },
  description : {
    presence: true
  },
  img : {
    presence: true
  }
}

validator.delete =
{
  id : {
    presence: true 
  }

}


module.exports = validator;