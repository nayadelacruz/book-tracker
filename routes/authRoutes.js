import { Router } from "express";
import passport from "passport";

const router = Router();

// Step 1: Redirect the user to Google
router.get("/auth/google", passport.authenticate("google"));

// Step 2: Google redirects the user back here
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/failed",
  }),
  (req, res) => {
    res.json({
      message: "Successfully authenticated with Google!",
      user: req.user,
    });
  },
);

// Authentication failure
router.get("/auth/failed", (req, res) => {
  res.status(401).json({
    message: "Google authentication failed",
  });
});

export default router;
