const AppDataSource = require("../data-source");
const Route = require("../entities/Routee"); // if you use require for your entity

const createRoute = async (req, res) => {
  const { name, city_id } = req.body;

  if (!name || !city_id)
    return res.status(400).json({ message: "Route name is required" });

  try {
    const routeRepo = AppDataSource.getRepository("Routee");
    const cityRepo = AppDataSource.getRepository("City");

    const city = await cityRepo.findOne({ where: { id: city_id } });
    if (!city) {
      return res.status(400).json({ message: "Invalid city_id" });
    }

    const existingRole = await routeRepo.findOne({ where: { name } });
    if (existingRole) {
      return res.status(400).json({ message: "Route already exists" });
    }

    const route = routeRepo.create({ name, city });
    await routeRepo.save(route);

    res.status(201).json({ message: "route created successfully", route });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating route", error: err.message });
  }
};


const updateRoute = async (req, res) => {
  const { name, id } = req.body;

  if (!name || !id)
    return res.status(400).json({ message: "name is required" });

  try {
    const routeRepo = AppDataSource.getRepository("Routee");
    const cityRepo = AppDataSource.getRepository("City");

    

    const route = await routeRepo.findOne({ where: { id } });
    if (!route) {
      return res.status(400).json({ message: "Route not exists" });
    }

    route.name = name ;
    await routeRepo.save(route);

    res.status(201).json({ message: "route updated successfully", route });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating route", error: err.message });
  }
};

const getRoute = async (req, res) => {
  try {
    const routeRepo = AppDataSource.getRepository("Routee");
    const route = await routeRepo.find({ relations: ['users'] });
    res.json({ route });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching route", error: err.message });
  }
};

const getPlaceByRouteId = async (req, res) => {
  try {
    const { id } = req.query;

    const routeRepo = AppDataSource.getRepository("Routee");
    const placeRepo = AppDataSource.getRepository("Place");

    const route = await routeRepo.findOne({
      where: { id: parseInt(id) },
    });

    if (!route) {
      return res.status(404).json({ message: "route not found" });
    }

    const places = await placeRepo.find({
      where: { route: { id: route.id } },
      relations: ["route"],
    });
    res.status(200).json({
      route: route.name,
      totalPlaces: places.length,
      places,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching routes", error: err.message });
  }
};



const assignRouteToSales = async (req, res) => {
  const { route_id, user_id } = req.body;

  if (!route_id || !user_id)
    return res.status(400).json({ message: "both routeId and userId is required" });

  try {
    const routeRepo = AppDataSource.getRepository("Routee");
    const userRepo = AppDataSource.getRepository("User");

    const  user = await userRepo.findOne({ where: { id: user_id } });
    // console.log("user",user);
    
    if (!user) {
      return res.status(400).json({ message: "Invalid user_id" });
    }

     const salesRepo = AppDataSource.getRepository("Sales");
     const sales = await salesRepo
      .createQueryBuilder("sales")    
      .where("sales.userId = :userId", { userId: user_id })
      .getOne();
    // console.log(users);
       if (!sales) {
      return res.status(200).json({ message: "Sales still need to complete Registeration" });
    }


    const routee = await routeRepo.findOne({ where: { id: route_id} });
    if (!routee) {
      return res.status(400).json({ message: "invalid route_id" });
    }
    console.log("routeuser",routee.user);


    
     if (routee.users) {
      return res
        .status(409)
        .json({ message: "Route already assigned to a user" });
    }

      routee.users = user;
    await routeRepo.save(routee);

    res.status(201).json({ message: "route created successfully", routee });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating route", error: err.message });
  }
};
const removeRouteFromSales = async (req, res) => {
  const { route_id, user_id } = req.body;

  if (!route_id || !user_id) {
    return res
      .status(400)
      .json({ message: "route_id and user_id are required" });
  }

  try {
    const routeRepo = AppDataSource.getRepository("Routee");
    const userRepo = AppDataSource.getRepository("User");

    const routee = await routeRepo.findOne({
      where: { id: route_id },
      relations: ["users"], // IMPORTANT
    });

    if (!routee) {
      return res.status(404).json({ message: "Route not found" });
    }

    if (!routee.users) {
      return res
        .status(400)
        .json({ message: "Route is not assigned to any user" });
    }

    if (routee.users.id !== user_id) {
      return res
        .status(403)
        .json({ message: "This route is not assigned to this user" });
    }

    // 🔥 REMOVE RELATION
    routee.users = null;

    await routeRepo.save(routee);

    return res.status(200).json({
      message: "Route unassigned successfully",
      routee,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error removing route from user",
      error: err.message,
    });
  }
};


module.exports = { createRoute, getRoute, getPlaceByRouteId,assignRouteToSales,removeRouteFromSales,updateRoute };
