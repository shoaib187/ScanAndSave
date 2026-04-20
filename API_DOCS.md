# Scan & Save — API Documentation

Base URL: `http://localhost:3000` (dev) | `https://yourdomain.com` (prod)

---

## Authentication

All protected endpoints require a JWT token.

Send token in **one of two ways**:

| Method | How |
|--------|-----|
| Cookie | `user_token` (set automatically on login) |
| Header | `Authorization: Bearer <token>` ← **Mobile apps use this** |

Token expires in **8 days**.

---

## Response Format

All responses follow this structure:

```json
{
  "success": true | false,
  "message": "...",
  "data": { ... }
}
```

Error responses include `"success": false` with an appropriate HTTP status code.

---

## 1. Auth

### POST `/api/user/auth/register`
Create a new account.

**Body (JSON):**
```json
{
  "full_name": "Alex Johnson",
  "email": "alex@example.com",
  "password": "Secret123",
  "terms_accepted": true
}
```

**Response `201`:**
```json
{
  "success": true,
  "message": "Account created successfully",
  "data": {
    "user_id": "...",
    "full_name": "Alex Johnson",
    "email": "alex@example.com",
    "token": "<jwt>"
  }
}
```

---

### POST `/api/user/auth/login`
Login with email & password.

**Body (JSON):**
```json
{
  "email": "alex@example.com",
  "password": "Secret123"
}
```

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "user_id": "...",
    "full_name": "Alex Johnson",
    "email": "alex@example.com",
    "avatar": null,
    "preferences": { "region": "US", "currency": "USD", "default_retailer": "amazon" },
    "notifications": { "price_drop": true, "weekly_price_report": true },
    "stats": { "total_scanned": 0, "total_saved": 0 },
    "token": "<jwt>"
  }
}
```

---

### POST `/api/user/auth/logout`
Clear session cookie.

**Auth:** Required
**Body:** None

**Response `200`:**
```json
{ "success": true, "message": "Logged out successfully" }
```

---

### GET `/api/user/auth/google`
Redirect to Google OAuth consent screen.

> For mobile apps: handle OAuth in-app using Google Sign-In SDK and then call `/api/user/auth/google/callback` directly with the auth code.

---

### GET `/api/user/auth/google/callback?code=...`
Exchange Google auth code for JWT.

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "user_id": "...",
    "full_name": "...",
    "email": "...",
    "avatar": "https://...",
    "token": "<jwt>"
  }
}
```

---

### POST `/api/user/auth/forgot-password`
Send password reset email.

**Body (JSON):**
```json
{ "email": "alex@example.com" }
```

**Response `200`:**
```json
{ "success": true, "message": "If an account exists, a reset link has been sent" }
```

---

### POST `/api/user/auth/reset-password`
Reset password using token from email.

**Body (JSON):**
```json
{
  "token": "<reset_token_from_email>",
  "new_password": "NewSecret123"
}
```

**Response `200`:**
```json
{ "success": true, "message": "Password reset successfully" }
```

---

## 2. Profile

### GET `/api/user/profile/get`
Get logged-in user's profile.

**Auth:** Required

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "user_id": "...",
    "full_name": "Alex Johnson",
    "email": "alex@example.com",
    "avatar": "https://...",
    "auth_provider": "local",
    "preferences": { "region": "US", "currency": "USD", "currency_symbol": "$", "default_retailer": "amazon" },
    "notifications": { "price_drop": true, "weekly_price_report": true },
    "stats": { "total_scanned": 47, "total_saved": 17 }
  }
}
```

---

### PUT `/api/user/profile/edit`
Update name and/or avatar.

**Auth:** Required
**Content-Type:** `multipart/form-data`

| Field | Type | Required |
|-------|------|----------|
| `full_name` | string | No |
| `avatar` | file (image) | No |

> Old avatar is **automatically deleted from Firebase** before uploading the new one.

**Response `200`:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": { "user_id": "...", "full_name": "...", "email": "...", "avatar": "https://..." }
}
```

---

## 3. Preferences

### GET `/api/user/preferences/get`
Get user's region & retailer preferences.

**Auth:** Required

---

### PUT `/api/user/preferences/update`
Update preferences.

**Auth:** Required
**Body (JSON):**
```json
{
  "region": "GB",
  "currency": "GBP",
  "currency_symbol": "£",
  "default_retailer": "amazon"
}
```

---

## 4. Notifications

### GET `/api/user/notifications/get`
Get notification settings.

**Auth:** Required

---

### PUT `/api/user/notifications/update`
Toggle notification settings.

**Auth:** Required
**Body (JSON):**
```json
{
  "price_drop": true,
  "weekly_price_report": false
}
```

---

## 5. Scanner

### POST `/api/scanner/scan`
Scan a barcode to get product + price comparison.

**Auth:** Required
**Body (JSON):**
```json
{ "barcode": "194252048436" }
```

**Product lookup — fallback chain (automatic, no action needed):**

| Priority | Source | Key required | Coverage |
|----------|--------|-------------|----------|
| 1 | Barcode Lookup API | Yes (`BARCODE_LOOKUP_API_KEY`) | All product types |
| 2 | Open Food Facts | No (free) | Food & grocery |
| 3 | UPC Item DB | No (free, 100 req/day) | General retail |

If all three fail → returns `MANUAL_ENTRY_REQUIRED`.

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "barcode": "194252048436",
    "name": "Sony WH-1000XM5 Wireless Headphones",
    "brand": "Sony",
    "category": "Electronics - Audio",
    "image": "https://...",
    "best_price": 279,
    "best_price_retailer": "amazon",
    "data_source": "barcode_lookup_api",
    "retailer_prices": [
      { "retailer_slug": "amazon", "retailer_name": "Amazon", "price": 279, "url": "https://...", "availability": "in_stock", "shipping_info": "Free 2-day shipping" },
      { "retailer_slug": "walmart", "retailer_name": "Walmart", "price": 289, "url": "https://...", "availability": "in_stock" },
      { "retailer_slug": "target", "retailer_name": "Target", "price": 350, "url": "https://...", "availability": "in_stock" }
    ]
  }
}
```

> `data_source` indicates which source resolved the product: `"barcode_lookup_api"`, `"open_food_facts"`, or `"upc_item_db"`.

**Error `404` — product not found in any source:**
```json
{ "success": false, "message": "Product not found in any database", "code": "MANUAL_ENTRY_REQUIRED" }
```

---

### POST `/api/scanner/manual-search`
Search by product name, brand, or barcode string.

**Auth:** Required
**Body (JSON):**
```json
{ "query": "Sony WH-1000XM5" }
```

**Search fallback chain (automatic):**
1. Local DB (cached products)
2. Barcode Lookup API text search — if `BARCODE_LOOKUP_API_KEY` is set
3. Open Food Facts text search — free, no key needed

**Response `200`:** Array of matching products (same structure as scan).

---

## 6. Products

### GET `/api/product/getAll`
List all products with pagination.

**Auth:** Required
**Query params:**
- `page` (default: 1)
- `limit` (default: 20, max: 50)
- `category` (filter)
- `search` (name/brand search)

---

### GET `/api/product/get/[id]`
Get single product by ID.

**Auth:** Required

---

### GET `/api/product/prices/[id]`
Get all retailer prices for a product (auto-refreshes if older than 6 hours).

**Auth:** Required

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "product_id": "...",
    "name": "Sony WH-1000XM5",
    "best_price": 279,
    "best_price_retailer": "amazon",
    "retailer_prices": [...],
    "prices_last_updated": "2026-04-20T10:00:00Z"
  }
}
```

---

## 7. Price Alerts

### POST `/api/price-alert/create`
Set a price alert for a product.

**Auth:** Required
**Body (JSON):**
```json
{
  "product_id": "...",
  "target_price": 250,
  "preferred_retailer": "amazon"
}
```

> If an alert already exists for this product, it will be **updated**.

---

### GET `/api/price-alert/getAll`
Get all active price alerts for the logged-in user.

**Auth:** Required

---

### GET `/api/price-alert/get/[id]`
Get a single price alert by ID.

**Auth:** Required

---

### PUT `/api/price-alert/update/[id]`
Update target price or preferred retailer.

**Auth:** Required
**Body (JSON):**
```json
{
  "target_price": 230,
  "preferred_retailer": "walmart"
}
```

---

### DELETE `/api/price-alert/delete/[id]`
Delete a price alert.

**Auth:** Required

---

## 8. History

### GET `/api/history/getAll`
Get scan history (recents or favorites).

**Auth:** Required
**Query params:**
- `tab`: `recents` (default) or `favorites`
- `page`, `limit`

**Response `200`:**
```json
{
  "success": true,
  "tab": "recents",
  "data": [
    {
      "_id": "...",
      "product_id": { "name": "Sony WH-1000XM5", "best_price": 279, "category": "Electronics", ... },
      "best_price_at_scan": 279,
      "scan_method": "camera",
      "createdAt": "2026-04-20T10:00:00Z"
    }
  ],
  "pagination": { "page": 1, "limit": 20, "total": 5, "pages": 1 }
}
```

---

### GET `/api/history/get/[id]`
Get a single history item.

**Auth:** Required

---

### DELETE `/api/history/delete/[id]`
Remove a history item.

**Auth:** Required

---

## 9. Favorites

### GET `/api/favorite/getAll`
Get all favorited products.

**Auth:** Required

---

### POST `/api/favorite/add`
Add a product to favorites.

**Auth:** Required
**Body (JSON):**
```json
{ "product_id": "..." }
```

---

### DELETE `/api/favorite/remove/[id]`
Remove from favorites. `[id]` = product_id.

**Auth:** Required

---

## 10. Retailers

### GET `/api/retailer/getAll`
Get all active retailers (no auth required).

**Response `200`:**
```json
{
  "success": true,
  "data": [
    { "_id": "...", "slug": "amazon", "name": "Amazon", "tagline": "Prime eligible - Fastest Delivery", "sort_order": 1 },
    { "_id": "...", "slug": "walmart", "name": "Walmart", "tagline": "Free shipping on $35+ Orders", "sort_order": 2 }
  ]
}
```

---

### GET `/api/retailer/get/[id]`
Get single retailer.

---

## 11. Regions

### GET `/api/region/getAll`
Get all supported regions/currencies.

**Query params:**
- `search`: filter by country name, code, or currency code

**Response `200`:**
```json
{
  "success": true,
  "data": [
    { "code": "US", "name": "United States", "currency_name": "US Dollar", "currency_code": "USD", "currency_symbol": "$" },
    { "code": "PK", "name": "Pakistan", "currency_name": "Pakistan Rupees", "currency_code": "PKR", "currency_symbol": "Rs" }
  ]
}
```

---

### GET `/api/region/get/[id]`
Get single region.

---

## Error Codes

| HTTP | message | Meaning |
|------|---------|---------|
| 400 | `"Missing fields: ..."` | Required fields not sent |
| 400 | `"Invalid email address"` | Bad email format |
| 400 | `"Invalid barcode format"` | Barcode not 6-14 digits |
| 401 | `"unauthorized"` | No token provided |
| 401 | `"token_expired"` | JWT has expired (re-login) |
| 403 | `"account_inactive"` | User account deactivated |
| 404 | `"PRODUCT_NOT_FOUND"` | No results in manual search |
| 404 | `"MANUAL_ENTRY_REQUIRED"` | Barcode not found in any source (all 3 fallbacks exhausted) |
| 409 | `"Email already registered"` | Duplicate registration |

---

## External APIs

### Paid (optional but recommended)

| API | Purpose | Website | Est. Cost |
|-----|---------|---------|-----------|
| **Barcode Lookup API** | barcode → product name, brand, category, image (all categories) | https://www.barcodelookup.com/api | from $49/mo |
| **PriceAPI** | real-time prices from Amazon, Walmart, Target | https://www.priceapi.com | from $30/mo |

### Free (built-in fallbacks — no key, no account needed)

| API | Purpose | Limit |
|-----|---------|-------|
| **Open Food Facts** | barcode/text search → food & grocery products | Unlimited |
| **UPC Item DB** | barcode lookup → general retail products | 100 req/day per IP |

> Free fallbacks are automatically used when `BARCODE_LOOKUP_API_KEY` is not set or the paid API returns no result. No configuration required.

Add keys to `.env.local`:
```
BARCODE_LOOKUP_API_KEY=your_key_here   # optional — free fallbacks used if missing
PRICE_API_KEY=your_key_here            # optional — prices skipped if missing
```
