const { createClient } = require( '@supabase/supabase-js' );

// Initialize Supabase client
const supabaseUrl = 'https://ybebribuhqqfklknusds.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliZWJyaWJ1aHFxZmtsa251c2RzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQzNzcxNjEsImV4cCI6MjAyOTk1MzE2MX0.6VCOaWJg_K3kJlZU5zF1sOfIxGxk4HN-SO9lIaJmNZU'; // Use the service role key for backend operations
const supabase = createClient( supabaseUrl, supabaseKey, );

async function main ()
{
  // Step 1: Create a table
  // await createTable();

  // Step 2: Read all objects from a bucket
  const { data: objects, error: objectError } = await supabase.storage.from( 'images' ).list( 'outfits' );
  if ( objectError ) return console.error( 'Error fetching objects:', objectError );

  console.log( objects, objectError )
  // return
  // Step 3: Generate signed URLs and add them to the table
  for ( const object of objects )
  {

    if ( !object.name.endsWith( 'png' ) ) continue;

    const filePath = `outfits/${ object.name }`;
    const { data, error } = await supabase.storage.from( 'images/outfits' ).getPublicUrl( object.name );

    console.log( data )
    if ( error )
    {
      console.error( 'Error creating signed URL:', error );
    } else if ( !data?.signedURL )
    {
      console.error( 'Signed URL came back null, likely due to a misconfiguration or permission issue.' );
    } else
    {
      console.log( 'Signed URL:', data.signedURL );
    }


    if ( data.publicUrl )
    {
      const { error: insertError } = await supabase.from( 'files' ).insert( [
        { url: data.publicUrl }
      ] );
      if ( insertError ) console.error( 'Error inserting data:', insertError );
      else console.log( 'Inserted signed URL for', object.name );

    }
  }
}

async function createTable ()
{
  const { data, error } = await supabase.rpc( 'create_files_table' );
  if ( error ) console.error( 'Error creating table:', error );
  else console.log( 'Table created successfully' );
}

main();
