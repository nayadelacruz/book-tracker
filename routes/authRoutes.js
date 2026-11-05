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

// Check wheter a user is currently logged in
router.get("/auth/me", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      message: "Not authenticated",
    });
  }

  return res.status(200).json({
    message: "Authenticated",
    user: {
      id: req.user.id,
      displayName: req.user.displayName,
    },
  });
});

//Log out and destroy the session
router.post("/auth/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    res.session.destroy((error) => {
      if (err) return next(err);

      res.clearCookie("connect.sid");
      return res.status(200).json({
        message: "Logged out successfully",
      });
    });
  });
});

export default router;
