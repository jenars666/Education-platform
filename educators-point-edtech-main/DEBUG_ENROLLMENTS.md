# Debug: Check Enrollments in Database

## Step 1: Check if enrollments exist

Open your browser console on the admin page and run:

```javascript
// Check Supabase connection
console.log('Supabase:', supabase);

// Manually query enrollments
const checkEnrollments = async () => {
  const { data, error, count } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact' });
  
  console.log('Total enrollments:', count);
  console.log('All enrollments:', data);
  console.log('Error:', error);
  
  // Check pending only
  const pending = data?.filter(e => e.status === 'pending');
  console.log('Pending enrollments:', pending?.length);
  console.log('Pending data:', pending);
};

checkEnrollments();
```

## Step 2: Check what you'll see

### If you see: `Total enrollments: 0`
**Problem**: No enrollments in database yet
**Solution**: Submit a test enrollment first

### If you see: `Total enrollments: 5` but `Pending enrollments: 0`
**Problem**: All enrollments have status other than "pending"
**Solution**: Either:
1. Submit a new enrollment (will be "pending" by default)
2. Or update an existing enrollment to "pending":

```javascript
// Update first enrollment to pending
const updateToPending = async () => {
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('id')
    .limit(1);
  
  if (enrollments && enrollments[0]) {
    const { data, error } = await supabase
      .from('enrollments')
      .update({ status: 'pending' })
      .eq('id', enrollments[0].id)
      .select();
    
    console.log('Updated:', data);
    console.log('Error:', error);
  }
};

updateToPending();
```

## Step 3: Check Realtime subscription

```javascript
// Check if realtime is working
const testRealtime = () => {
  const channel = supabase
    .channel('test-enrollments')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'enrollments'
      },
      (payload) => {
        console.log('🔔 REALTIME EVENT:', payload);
      }
    )
    .subscribe((status) => {
      console.log('Subscription status:', status);
    });
};

testRealtime();
```

Then go to Supabase Dashboard → Table Editor → enrollments → Insert a row manually.
You should see the event in console immediately.

## Step 4: Quick Fix - Insert Test Data

Run this in browser console to insert a test enrollment:

```javascript
const insertTestEnrollment = async () => {
  const { data, error } = await supabase
    .from('enrollments')
    .insert({
      name: 'Test Student',
      email: 'test@example.com',
      mobile_no: '1234567890',
      batch: 'Test Batch',
      batch_start_date: '2024-01-01',
      batch_end_date: '2024-03-01',
      price: 5000,
      status: 'pending',
      email_sent: 0
    })
    .select();
  
  console.log('Inserted:', data);
  console.log('Error:', error);
};

insertTestEnrollment();
```

After running this, you should see:
- Notification count increase to 1
- Bell icon bounce
- New enrollment in dropdown

## Common Issues

### Issue: "relation 'enrollments' does not exist"
**Fix**: Run the migration to create the table:
```bash
npm run db:push
```

### Issue: "permission denied for table enrollments"
**Fix**: Check RLS policies in Supabase Dashboard:
1. Go to Authentication → Policies
2. Make sure there's a policy allowing SELECT on enrollments table
3. Or temporarily disable RLS for testing:
   ```sql
   ALTER TABLE enrollments DISABLE ROW LEVEL SECURITY;
   ```

### Issue: Realtime not working
**Fix**: 
1. Supabase Dashboard → Database → Replication
2. Make sure `enrollments` table has replication enabled
3. Check if your Supabase project is on a paid plan (free tier has limits)
