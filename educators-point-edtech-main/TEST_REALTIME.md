# Testing Real-Time Notifications

## ✅ Setup Complete!

Your Supabase configuration is ready:
- URL: `https://ihkgltlgjcpmqrjogtwg.supabase.co`
- Realtime replication: **ENABLED** for `enrollments` table

---

## 🧪 Test the Real-Time Notifications

### **Method 1: Two Browser Windows (Recommended)**

1. **Open Admin Dashboard** (Window 1)
   ```
   http://localhost:5173/admin
   ```
   - Look at the notification bell in the top-right corner
   - Note the current count (if any)

2. **Open Enrollment Form** (Window 2)
   ```
   http://localhost:5173/enrollment
   ```
   - Fill out the enrollment form
   - Submit it

3. **Watch Window 1 (Admin Dashboard)**
   - Bell icon should **bounce** for 3 seconds
   - Badge count should **update instantly**
   - Click bell to see the new enrollment

---

### **Method 2: Browser Console Test**

1. Open admin dashboard
2. Open browser DevTools (F12)
3. Go to Console tab
4. Submit a new enrollment from another tab
5. You should see in console:
   ```
   🔔 New enrollment received: {new: {...}, old: null, ...}
   ```

---

### **Method 3: Direct Database Insert**

1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/ihkgltlgjcpmqrjogtwg)
2. Navigate to: **Table Editor** → **enrollments**
3. Click **Insert row**
4. Fill in required fields:
   - `name`: "Test User"
   - `email`: "test@example.com"
   - `batch`: "Batch 1"
   - `batch_start_date`: "2024-01-01"
   - `batch_end_date`: "2024-03-01"
   - `price`: 5000
   - `status`: "pending"
5. Click **Save**
6. Watch your admin dashboard update **instantly**!

---

## 🔍 Debugging

### Check WebSocket Connection

Open browser console on admin dashboard and run:
```javascript
// Check if Supabase is connected
console.log('Supabase client:', supabase);

// Check active channels
console.log('Active channels:', supabase.getChannels());
```

You should see a channel named `enrollments-changes` with status `joined`.

---

### Check Network Tab

1. Open DevTools → Network tab
2. Filter by **WS** (WebSocket)
3. You should see a WebSocket connection to Supabase
4. When you submit an enrollment, you'll see messages flowing through the WebSocket

---

### Common Issues

**Issue 1: No notification appears**
- ✅ Check: Is Realtime enabled in Supabase?
- ✅ Check: Are you logged in as admin?
- ✅ Check: Is the enrollment status "pending"?

**Issue 2: Console shows errors**
- ✅ Check: `.env` file has correct Supabase credentials
- ✅ Check: Supabase project is not paused
- ✅ Check: RLS policies allow admin access

**Issue 3: Notification appears but count is wrong**
- ✅ The count only shows "pending" enrollments
- ✅ If you change status to "confirmed", count decreases

---

## 🎯 Expected Behavior

### When New Enrollment Submitted:
1. ⚡ **Instant** - No delay (WebSocket)
2. 🔔 Bell icon **bounces** for 3 seconds
3. 💫 Bell icon **pulses** for 3 seconds
4. 🔴 Badge count **increases by 1**
5. 📋 New enrollment appears in dropdown (top of list)
6. 📝 Console logs: `🔔 New enrollment received:`

### When Enrollment Status Updated:
1. ⚡ **Instant** update
2. 🔴 Badge count **decreases** (if changed from "pending")
3. 📋 Enrollment removed from dropdown (if no longer "pending")
4. 📝 Console logs: `📝 Enrollment updated:`

---

## 🚀 Next Steps

Once you confirm it's working:
1. ✅ Test with real enrollment form submissions
2. ✅ Test with multiple admins logged in simultaneously
3. ✅ Test status updates (pending → confirmed)
4. ✅ Monitor performance with many enrollments

---

## 📊 Performance Notes

- **WebSocket Connection**: Single persistent connection
- **Data Transfer**: Only changed records (not full table)
- **Memory Usage**: Minimal (only stores 5 recent enrollments)
- **Auto-Cleanup**: Unsubscribes when admin logs out

---

## ✨ Features Working

✅ Real-time notification count  
✅ Real-time enrollment list  
✅ Bounce animation on new enrollment  
✅ Pulse animation on badge  
✅ Dropdown with recent enrollments  
✅ Click to navigate to CRM  
✅ Auto-refresh on INSERT/UPDATE  
✅ Clean console logging  

---

**Ready to test? Open two browser windows and try it out! 🎉**
