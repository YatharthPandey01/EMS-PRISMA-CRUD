const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


router.get('/employees', async (req, res, next) => {
  try {
    const employees = await prisma.employee.findMany({
      include: { department: true },
    });

    const departments = await prisma.department.findMany({
      include: { employees: true },
    });

    res.json({ employees, departments });

  } catch (error) {
    next(error);

  }
});


router.get('/employees/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const employees = await prisma.employee.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        department: true
      }
    })
    res.json(employees);

  } catch (error) {
    next(error)

  }
});


router.post('/employees', async (req, res, next) => {

  try {
    //const data=req.body
    const employees = await prisma.employee.create({
      data: req.body,
    })
    res.json(employees)
  } catch (error) {
    next(error)

  }
});


router.delete('/employees/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedProduct = await prisma.employee.delete({
      where: {
        id: Number(id)
      }

    })
    res.json(deletedProduct);

  } catch (error) {
    next(error)

  }
});


router.patch('/employees/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedProduct = await prisma.employee.update({
      where: {
        id: Number(id)
      },
      data: req.body,
      include: {
        department: true
      }
    })
    res.json(updatedProduct)

  } catch (error) {
    next(error)

  }
});



module.exports = router;
