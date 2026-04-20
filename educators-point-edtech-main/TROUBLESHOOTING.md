# 🔧 TROUBLESHOOTING: Notifications Not Showing

## Problem
You're seeing "No recent enrollments" even though enrollments exist in the database.

## Solution Steps

### Step 1: Open Test Page
Navigate to:
```
http://localhost:5173/test-notifications
```

This page will help you debug the issue.

### Step 2: Check Realtime Status
On the test page, look at the "Status" card:
- **Realtime:** Should say "SUBSCRIBED" (green)
- If it says anything else, there's a connection issue

### Step 3: Check Database
Click "Check Database" button and look at the logs:
- It will show total enrollments
- It will show pending enrollments
- If pending = 0, that's your problem!

### Step 4: Insert Test Enrollment
Click "Insert Test Enrollment" button:
- This will create a test enrollment with status="pending"
- Watch the logs for realtime notification
- The notification count should update instantly
- Go back to `/admin` and check the bell icon

---

## Common Issues & Fixes

### Issue 1: All enrollments have status other than "pending"

**Symptoms:**
- Total enrollments: 5
- Pending enrollments: 0
- Notification count: 0

**Fix:** Update an existing enrollment to "pending":

1. Go to Supabase Dashboard
2. Table Editor → enrollments
3. Click on any enrollment
4. Change `status` to "pending"
5. Save
6. Watch admin dashboard update instantly!

---

### Issue 2: Realtime status is not "SUBSCRIBED"

**Symptoms:**
- Realtime: CLOSED or CHANNEL_ERROR
- No notifications appear

**Fix:**

1. **Check Supabase Dashboard:**
   - Database → Replication
   - Make sure `enrollments` table is enabled ✅

2. **Check RLS Policies:**
   - Go to Authentication → Policies
   - Make sure there's a policy allowing SELECT on enrollments
   - Or temporarily disable RLS:
   ```sql
   ALTER TABLE enrollments DISABLE ROW LEVEL SECURITY;
   ```

3. **Restart your dev server:**
   ```bash
   npm run dev
   ```

---

### Issue 3: No enrollments in database at all

**Symptoms:**
- Total enrollments: 0
- Pending enrollments: 0

**Fix:** Use the test page to insert a test enrollment:
1. Go to `/test-notifications`
2. Click "Insert Test Enrollment"
3. Watch the magic happen!

---

## Expected Behavior

### When you click "Insert Test Enrollment":

1. **Console Logs (on test page):**
   ```
   [10:30:45] ➕ Inserting test enrollment...
   [10:30:45] ✅ Inserted: Test User 1234567890
   [10:30:45] 🔔 Watch for realtime notification!
   [10:30:45] 🔔 Realtime event: INSERT
   [10:30:45] 📧 Data: {"id":"123","name":"Test User 1234567890"...}
   ```

2. **Status Card Updates:**
   - Pending Count: 0 → 1
   - Recent Enrollments: 0 → 1

3. **Admin Dashboard (if open in another tab):**
   - Bell icon bounces
   - Badge shows "1"
   - Dropdown shows the new enrollment

---

## Quick Fix Script

If nothing works, run this in browser console on `/test-notifications`:

```javascript
// Force insert a test enrollment
const fixIt = async () => {
  const { data, error } = await supabase
    .from('enrollments')
    .insert({
      name: 'URGENT TEST',
      email: 'urgent@test.com',
      mobile_no: '9999999999',
      batch: 'Emergency Batch',
      batch_start_date: '2024-01-01',
      batch_end_date: '2024-03-01',
      price: 1,
      status: 'pending',
      email_sent: 0,
      date_of_birth: '2000-01-01',
      state: 'Test',
      district: 'Test',
      place: 'Test',
      current_status: 'Test'
    })
    .select();
  
  console.log('Result:', data, error);
};

fixIt();
```

---

## Still Not Working?

### Check these:

1. **Is your Supabase project active?**
   - Go to Supabase Dashboard
   - Make sure project is not paused

2. **Are environment variables correct?**
   - Check `.env` file
   - Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are correct

3. **Is the server running?**
   - Make sure `npm run dev` is running
   - Check for any errors in terminal

4. **Browser console errors?**
   - Open DevTools (F12)
   - Check Console tab for errors
   - Check Network tab for failed requests

---

## Success Checklist

✅ Test page shows "Realtime: SUBSCRIBED"  
✅ "Check Database" shows pending enrollments > 0  
✅ "Insert Test Enrollment" creates new enrollment  
✅ Console logs show realtime event  
✅ Pending count increases  
✅ Admin dashboard bell shows badge  
✅ Clicking bell shows enrollments  

---

## Next Steps

Once you see notifications working on the test page:

1. Go to `/admin` dashboard
2. Open `/enroll` in another tab
3. Submit a real enrollment
4. Watch the notification appear instantly!

**The test page is your friend! Use it to debug! 🚀**
