import React, {useEffect} from "react";
import {Box, Container, Grid} from "@material-ui/core";
import {useFilter} from "../../context/filterContext";
import {FILTER_ALL, FILTER_DONE, FILTER_UNDONE} from "../../context/filterStates";
import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab";

const TodoFilter: React.FC = () => {
    const {filter, setFilter} = useFilter();

    const handleFilter = (event: React.MouseEvent, newAlignment: string): void => {
        setFilter(newAlignment)
    };

    useEffect(()=>{
        setFilter(FILTER_ALL)
    }, [])

    return(
        <Container>
            <Box m={2} />
            <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="center"

            >
                <ToggleButtonGroup
                    value={filter}
                    exclusive
                    onChange={handleFilter}
                    aria-label="filters"
                >
                    <ToggleButton value={FILTER_ALL} aria-label={FILTER_ALL}>
                        All
                    </ToggleButton>
                    <ToggleButton value={FILTER_DONE} aria-label={FILTER_DONE}>
                        Done
                    </ToggleButton>
                    <ToggleButton value={FILTER_UNDONE} aria-label={FILTER_UNDONE}>
                        Undone
                    </ToggleButton>
                </ToggleButtonGroup>
            </Grid>
        </Container>
    )
}

export default TodoFilter