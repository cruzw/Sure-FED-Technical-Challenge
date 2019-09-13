import { Grid, Typography, Button } from '@material-ui/core';
import RadioOptions from '../components/radioOptions';
import { withStyles } from '@material-ui/styles';
import dlv from 'delve';

const styles = {
  grid: {
    padding: 20
  },
  spaceAbove: {
    marginTop: 50
  },

};

const QuoteOverviewScreen = ({ backToRating, quote, classes }) => {
  const deductibleValues = dlv(quote, 'variable_options.deductible.values');
  const deductibleTitle = dlv(quote, 'variable_options.deductible.title');
  const deductibleDescription = dlv(quote, 'variable_options.deductible.description');
  const deductibleCurrentlySelected = dlv(quote, 'variable_selections.deductible');
  const asteroidCollisionValues = dlv(quote, 'variable_options.asteroid_collision.values');
  const asteroidTitle = dlv(quote, 'variable_options.asteroid_collision.title');
  const asteroidDescription = dlv(quote, 'variable_options.asteroid_collision.description');
  const asteroidCollisionCurrentlySelected = dlv(quote, 'variable_selections.asteroid_collision');
  const { premium } = quote;

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.grid}
    >

      {/* Deductible Section */}
      <Typography className={classes.spaceAbove} variant="h5" component="h3" align="center" gutterBottom>
        {deductibleTitle}
      </Typography>
      <Typography variant="h6" component="h4" align="center" gutterBottom>
        {deductibleDescription}
      </Typography>
      <RadioOptions
        name="deductibles"
        values={deductibleValues}
        selected={deductibleCurrentlySelected}
      />

      {/* Asteroid Collision Section */}
      <Typography className={classes.spaceAbove} variant="h5" component="h3" align="center" gutterBottom>
        {asteroidTitle}
      </Typography>
      <Typography variant="h6" component="h4" align="center" gutterBottom>
        {asteroidDescription}
      </Typography>
      <RadioOptions
        name="asteroidCollision"
        values={asteroidCollisionValues}
        selected={asteroidCollisionCurrentlySelected}
      />

      {/* Premium Section */}
      <Typography className={classes.spaceAbove} variant="subtitle1" component="h3" align="center">
        Total Annual Premium: <br/> <u><i>${premium}</i></u>
      </Typography>

      {/* Back to <RatingInfoScreen /> (where previous form data persisted) */}
      <Button className={classes.spaceAbove} onClick={backToRating} variant="contained" color="secondary">
        Back to Rating Info
      </Button>
    </Grid>
  );
}

export default withStyles(styles)(QuoteOverviewScreen);