import express from "express";
import { body, param } from "express-validator";
import { createTransaction, getTransactions, getTransactionById, updateTransaction, deleteTransaction, getSummary } from "../controllers/transactionsController.js";

const router = express.Router();

// Allowed categories
const allowedCategories = [ "salary", "groceries", "entertainment", "bills", "transport", "savings", "other" ];

// Get all transactions (with filters)
router.get("/", getTransactions);

// Get summary (income vs expense)
router.get("/summary", getSummary);

// Get single transaction
router.get("/:id", getTransactionById);

//  Create new transaction
router.post("/",
  [
    body("type").isIn(["income", "expense"]).withMessage("Type must be either 'income' or 'expense'"),
    body("amount").isFloat({ gt: 0 }).withMessage("Amount must be a positive number"),
    body("category").isIn(allowedCategories).withMessage(`Category must be one of: ${allowedCategories.join(", ")}`),
    body("date").optional().isISO8601().toDate().withMessage("Date must be in ISO8601 format"),
  ],
  createTransaction
);

// Update existing transaction
router.put(
  "/:id",
  [
    param("id").isMongoId().withMessage("Invalid transaction ID"),
    body("type").optional().isIn(["income", "expense"]).withMessage("Type must be either 'income' or 'expense'"),
    body("amount").optional().isFloat({ gt: 0 }).withMessage("Amount must be a positive number"),
    body("category").optional().isIn(allowedCategories).withMessage(`Category must be one of: ${allowedCategories.join(", ")}`),
    body("date").optional().isISO8601().toDate().withMessage("Date must be in ISO8601 format"),
  ],
  updateTransaction
);

// Delete transaction
router.delete("/:id", deleteTransaction);

export default router;