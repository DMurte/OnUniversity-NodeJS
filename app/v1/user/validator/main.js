let validator = {};

validator.register =
{
  firstName : {
    presence: true
  },
  lastName : {
    presence: true
  },
  email : {
    presence: true
  },
  password : {
    presence: true
  }
}



validator.login =
{
  email : {
    presence: true
  },
  password : {
    presence: true
  }
}



validator.getUser =
{
  userId : {
    presence: true
  }
}

validator.getById =
{
  id : {
    presence: true
  }
}

validator.confirm =
{
  token : {
    presence: true
  }
}

validator.block =
{
  userId : {
    presence: true
  }
}

validator.activate =
{
  userId : {
    presence: true
  }
}

validator.update =
{
  firstName : {
    presence: true
  },
  lastName : {
    presence: true
  },
  email : {
    presence: true
  },
  oldEmail : {
    presence: true
  },

}

validator.updatePassword =
{
  oldPassword : {
    presence: true
  },
  password : {
    presence: true
  },
  userId : {
    presence: true
  }

}

validator.restore =
{
  token : {
    presence: true
  },
  password : {
    presence: true
  }

}

validator.restorePassword =
{
  email : {
    presence: true
  }

}

module.exports = validator;
