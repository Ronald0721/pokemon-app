import React from "react";
import HomeController from "./HomeController";
import InfiniteScroll from "react-infinite-scroll-component";
import { Box, Container } from "@material-ui/core";
import { PokemonList, SearchBar, ErrorDisplay } from "../../components";

export default class HomeView extends HomeController {
  render() {
    const { pokemonList, hasMore, error } = this.state;
    const loader = <h1>...</h1>;

    return (
      <>
        <SearchBar onSearch={this.handleSearch} />
        <Container maxWidth="xl">
          {error ? (
            <Box>
              <ErrorDisplay error={error} />
            </Box>
          ) : (
            <InfiniteScroll
              dataLength={pokemonList.length}
              next={this.fetchMoreData}
              hasMore={hasMore}
              loader={loader}
            >
              <PokemonList pokemons={pokemonList} />
            </InfiniteScroll>
          )}
        </Container>
      </>
    );
  }
}
