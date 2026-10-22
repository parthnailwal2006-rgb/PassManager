

const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    convert: true
  });

  if (error) {
    const errors = error.details.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message,
      code: detail.type
    }));

    return res.status(400).json({
      success: false,
      errors
    });
  }

  // Replace the original body with the validated,
  // normalized values (e.g. trimmed, lowercase email).
  req.body = value;

  next();
};

module.exports = validate;
