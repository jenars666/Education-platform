# Real-Time Enrollment Notifications

## Overview
The admin navbar now displays **real-time notifications** for new enrollments using Supabase Realtime.

## Features

### ✅ Real-Time Updates
- Instant notification when a new enrollment is submitted
- No page refresh needed
- Uses Supabase Realtime WebSocket connection

### ✅ Visual Indicators
- **Red badge** with count of pending enrollments
- **Bounce animation** when new enrollment arrives
- **Pulse effect** on bell icon for 3 seconds

### ✅ Notification Dropdown
- Click bell icon to see recent enrollments
- Shows last 5 pending enrollments with:
  - Student name
  - Email address
  - Batch name
  - Timestamp
- Click any enrollment to navigate to CRM page
- "View All Enrollments" button at bottom

## How It Works

### 1. Supabase Realtime Subscription
```typescript
supabase
  .channel('enrollments-changes')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'enrollments'
  }, (payload) => {
    // Refetch notification count and recent enrollments
    refetchCount();
    refetchRecent();
  })
  .subscribe();
```

### 2. Server Endpoints (tRPC)
- `enrollment.getUnreadCount` - Returns count of pending enrollments
- `enrollment.getRecent` - Returns last 5 pending enrollments

### 3. Auto-Refresh on Changes
- INSERT: New enrollment → Update count + list
- UPDATE: Status change → Update count + list

## Setup Requirements

### Supabase Configuration
Ensure Realtime is enabled for the `enrollments` table:

1. Go to Supabase Dashboard
2. Navigate to Database → Replication
3. Enable replication for `enrollments` table
4. Ensure RLS policies allow admin access

### Environment Variables
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## Testing

### Test Real-Time Notifications:
1. Open admin dashboard in one browser tab
2. Open enrollment form in another tab
3. Submit a new enrollment
4. Watch the notification bell in admin dashboard:
   - Count updates instantly
   - Bell bounces for 3 seconds
   - Badge pulses
   - New enrollment appears in dropdown

## Performance
- WebSocket connection (minimal overhead)
- Only fetches data when changes occur
- Automatic cleanup on component unmount
- No polling intervals needed

## Browser Console Logs
When a new enrollment arrives, you'll see:
```
🔔 New enrollment received: { ... }
```

When an enrollment is updated:
```
📝 Enrollment updated: { ... }
```
