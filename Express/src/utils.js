export function internalServerError(res) {
  res.status(500).send({ message: "Internal Server Error!" });
}

export function notFound(res) {
  res.status(404).send({ message: "Not Found" });
}

export function badRequest(res, message) {
  res.status(400).send({ message });
}

export function commonControllerHandler(res, callback) {
  try {
    callback();
  } catch (e) {
    internalServerError(res);
  }
}

export function isRequestObjectValid(res, schema, object) {
  const error = commonSchemeErrorParser(schema, object);
  if(error){
    badRequest(res, error);
    return true
  }
  return false;
}

export function commonSchemeErrorParser(schema, object) {
  const { error } = schema.validate(object, { abortEarly: false });
  if (error) {
    return error.details.map((det) => det.message).join(", ");
  }
  return null;
}
