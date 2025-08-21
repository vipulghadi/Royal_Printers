
export default async function paginator(model, args = {}, page = 1, limit = 10) {
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    model.findMany({
      ...args,
      skip,
      take: limit,
    }),
    model.count({ where: args.where }),
  ]);

  return {
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}
