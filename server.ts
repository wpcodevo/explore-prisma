import connecDB, { prisma } from './connectDB';

// ConnectDB
connecDB();

async function main() {
  // Insert a single user
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
    },
  });

  // Insert multiple users
  await prisma.user.createMany({
    data: [
      {
        name: 'Jane Doe',
        email: 'janedoe@gmail.com',
      },
      {
        name: 'Jack Doe',
        email: 'jackdoe@gmail.com',
      },
      {
        name: 'Jill Doe',
        email: 'jilldoe@gmail.com',
      },
    ],
  });

  // Find a single user
  const uniqueUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  // Find all users
  const allUsers = await prisma.user.findMany();

  // Update a single user
  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      name: 'Prince Doe',
    },
  });

  // Update multiple users
  const updatedUsers = await prisma.user.updateMany({
    where: {
      OR: [{ id: 1 }, { id: 2 }],
    },
    data: {
      name: 'Micheal Doe',
    },
  });

  // Delete a single user
  await prisma.user.delete({
    where: {
      id: user.id,
    },
  });

  // Delete all users
  await prisma.user.deleteMany({});
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
