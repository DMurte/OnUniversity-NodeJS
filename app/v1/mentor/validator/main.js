let validator = {};



validator.create =
{
  mentorId : {
    presence: true
  },
  userId : {
    presence: true
  }
}

validator.createTopic =
{
  mentorId : {
    presence: true
  },
  topicId : {
    presence: true
  }
}
validator.deleteTopic =
{
  mentorId : {
    presence: true
  },
  topicId : {
    presence: true
  },
  userId : {
    presence: true
  }
}
validator.getMentorships =
{
  userId : {
    presence: true
  }
}
validator.delete =
{
  mentorId : {
    presence: true
  }
}

module.exports = validator;
