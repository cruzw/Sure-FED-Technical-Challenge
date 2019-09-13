import { Grid, TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { formFields } from '../config';

const styles = {
  grid: {
    padding: 20
  },
  textField: {
    margin: "10px 0"
  },
  btn: {
    marginTop: 20
  }
};

const RatingInfoScreen = ({
  classes,
  handleInputChange,
  formComplete,
  handleQuoteRequest,
  ...props
}) => (
  <Grid
    container
    direction="column"
    justify="center"
    alignItems="center"
    className={classes.grid}
  >
    {
      formFields.map(({ label, name }) => (
        <TextField
          key={name}
          className={classes.textField}
          name={name}
          label={label}
          value={props[name]}
          onChange={handleInputChange}
        />
      ))
    }
    <Button
      className={classes.btn}
      variant="contained"
      color="primary"
      disabled={!formComplete}
      onClick={handleQuoteRequest}
      size="large"
    >
      Submit!
    </Button>
  </Grid>
);

export default withStyles(styles)(RatingInfoScreen);