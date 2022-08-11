import connecDB, { prisma } from './connectDB';

// ConnectDB
connecDB();

async function main() {
  // Create a new user
  const newUser = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
      photo: 'default.jpg',
      role: 'user',
      provider: 'local',
      verified: true,
      userPreference: {
        create: {
          emailUpdates: true,
          preference: 'all',
        },
      },
    },
    include: { userPreference: true },
  });

  // Create multiple new users
  const numberOfUsers = await prisma.user.createMany({
    data: [
      {
        name: 'Jane Doe',
        email: 'janedoe@gmail.com',
        password: '123456',
        photo: 'default.jpg',
        role: 'user',
        provider: 'local',
        verified: true,
      },
      {
        name: 'Micheal Smith',
        email: 'michealsmith@gmail.com',
        password: '123456',
        photo: 'default.jpg',
        role: 'admin',
        provider: 'google',
        verified: true,
      },
    ],
  });

  // Find all users
  const users = await prisma.user.findMany({
    where: {
      OR: [{ verified: true }, { provider: 'local' }],
      email: { contains: '@gmail.com' },
      AND: [{ verified: true }, { provider: 'local' }],
    },
    select: {
      id: true,
      email: true,
      name: true,
      verified: true,
      provider: true,
      createdAt: true,
      updatedAt: true,
    },
    skip: 0,
    take: 10,
    orderBy: {
      createdAt: 'desc',
    },
  });

  // Find one unique user
  const user = await prisma.user.findUnique({
    where: {
      id: '193e462a-0e9d-4bd0-9603-3ca636fbd3cb',
    },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  // Update one user
  const updatedUser = await prisma.user.update({
    where: {
      email: 'johndoe@gmail.com',
    },
    data: {
      name: 'Alexander Smith',
      email: 'alexandersmith@gmail.com',
    },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
      createdAt: true,
    },
  });

  // Update multiple users
  const numberOfUpdatedUsers = await prisma.user.updateMany({
    where: {
      OR: [{ name: 'John Doe' }, { name: 'Jane Doe' }],
    },
    data: {
      verified: true,
    },
  });

  // Delete multiple users
  const numberOfDeletedUsers = await prisma.user.deleteMany({
    where: {
      verified: { equals: true },
    },
  });
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
