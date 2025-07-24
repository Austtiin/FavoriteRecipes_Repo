# Database Configuration for Static Web Apps

This folder contains the database configuration files for Azure Static Web Apps with Cosmos DB integration.

## Files

- `staticwebapp.database.config.json` - Main configuration file for Cosmos DB connections
- `staticwebapp.database.schema.gql` - GraphQL schema definition for the Recipe model

## Setup

1. **Database Connection String**: Set the `DATABASE_CONNECTION_STRING` environment variable in your Azure Static Web App configuration to:
   ```
   AccountEndpoint=https://austinadmin.documents.azure.com:443/;AccountKey=w3dgtCXz5kno3svFvqDwfRiUOk5u1D1CDDab2rBGNkObpB2rrCpXv1sX435MfJryH3enWUDDiaVfACDbii8Hjw==;
   ```

2. **Database Setup**: 
   - Create a Cosmos DB database named `FavoriteRecipesDB`
   - Create a container named `recipes`
   - Set the partition key to `/id`

3. **Permissions**: The current configuration allows anonymous access. Consider updating the permissions based on your security requirements:
   - `anonymous` - No authentication required
   - `authenticated` - Requires user authentication
   - Custom roles can be defined

## API Endpoints

Once deployed, your Recipe database will be accessible via:

- **REST API**: `https://your-app.azurestaticapps.net/rest/Recipe`
- **GraphQL**: `https://your-app.azurestaticapps.net/graphql`

## Recipe Schema

The Recipe model includes:
- `id` - Unique identifier
- `title` - Recipe title (required)
- `description` - Recipe description
- `ingredients` - Array of ingredients (required)
- `instructions` - Array of cooking steps (required)
- `cookingTime` - Time in minutes
- `servings` - Number of servings
- `difficulty` - Difficulty level
- `category` - Recipe category
- `tags` - Array of tags
- `createdAt/updatedAt` - Timestamps
- `author` - Recipe author
- `rating` - Recipe rating (0-5)
- `imageUrl` - Recipe image URL

## Security Considerations

- **Connection String**: Store securely as an environment variable
- Review CORS settings for production
- Consider implementing proper authentication roles
- Validate database permissions match your security requirements
