import gql from 'graphql-tag';

export const getCardsQuery = gql`
  query getCards($filters: CardInput!) {
    cards(filters: $filters) {
      id
      name
      rarity
      type
      colors
      formats
      versions
      imageUri
      faces {
        id
        name
        type
        colors
        imageUri
      }
      set {
        id
        name
        code
        releasedAt
        iconUri
      }
    }
  }
`;
