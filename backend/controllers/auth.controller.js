//http:localhost:3000/api/auth

export const register=async (req, res) => {
  const { name, email, password, Age, gender, role, bloodGroup } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      Age,
      gender,
      password: hashedPassword,
      role,
      bloodGroup,
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};