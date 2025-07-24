# 🍳 Favorite Recipes App

A modern recipe management application built with Next.js, TypeScript, and Azure Static Web Apps with Cosmos DB integration.

## Features

### ✨ Current Features
- **Recipe Management**: Add, view, edit, and delete recipes
- **Rich Recipe Data**: Support for ingredients, instructions, cooking time, servings, difficulty, categories, tags, and ratings
- **Responsive Design**: Beautiful, mobile-friendly interface
- **Dark Mode Support**: Automatic theme switching
- **Image Support**: Recipe images with optimized loading

### 🚀 Planned Features (when database is connected)
- **Real-time Sync**: Automatic synchronization with Cosmos DB
- **Search & Filter**: Advanced recipe search and filtering
- **User Authentication**: Personal recipe collections
- **Recipe Sharing**: Share recipes with others

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Azure Cosmos DB
- **API**: Azure Static Web Apps Data API
- **Deployment**: Azure Static Web Apps
- **CI/CD**: GitHub Actions

## Getting Started

### Prerequisites
- Node.js 20 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd FavoriteRecipes_Repo/favrec
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
favrec/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   ├── components/          # React components
│   │   ├── AddRecipe.tsx    # Recipe creation form
│   │   ├── RecipeList.tsx   # Recipe grid view
│   │   └── RecipeDetail.tsx # Individual recipe view
│   ├── types/               # TypeScript type definitions
│   │   └── recipe.ts        # Recipe interface
│   └── utils/               # Utility functions
│       └── api.ts           # API integration functions
├── public/                  # Static assets
├── swa-db-connections/      # Database configuration
│   ├── staticwebapp.database.config.json
│   └── staticwebapp.database.schema.gql
└── .github/workflows/       # GitHub Actions
```

## Database Configuration

The app is configured to work with Azure Cosmos DB through Static Web Apps Data API:

- **Database**: `FavoriteRecipesDB`
- **Container**: `recipes`
- **API Endpoints**:
  - REST: `/rest/Recipe`
  - GraphQL: `/graphql`

### Environment Variables

Set the following in your Azure Static Web App:

```
DATABASE_CONNECTION_STRING=AccountEndpoint=https://austinadmin.documents.azure.com:443/;AccountKey=w3dgtCXz5kno3svFvqDwfRiUOk5u1D1CDDab2rBGNkObpB2rrCpXv1sX435MfJryH3enWUDDiaVfACDbii8Hjw==;
```

## Recipe Schema

```typescript
interface Recipe {
  id: string;
  title: string;
  description?: string;
  ingredients: string[];
  instructions: string[];
  cookingTime?: number;
  servings?: number;
  difficulty?: string;
  category?: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
  author?: string;
  rating?: number;
  imageUrl?: string;
}
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Features

1. Create components in `src/components/`
2. Add types to `src/types/`
3. Update API functions in `src/utils/api.ts`
4. Test locally before deploying

## Deployment

The app is automatically deployed to Azure Static Web Apps through GitHub Actions when you push to the main branch.

### Manual Deployment

1. Build the app:
   ```bash
   npm run build
   ```

2. Deploy using Azure CLI or through the Azure portal

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- Open an issue on GitHub
- Check the Azure Static Web Apps documentation
- Review the Next.js documentation
