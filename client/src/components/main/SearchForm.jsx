import { Label, Input, Select } from '../../styles/components';

const SearchForm = props => {
  const { state, handleInputChange, categories } = props;

  return (
    <form onSubmit={(e) => props.search(null, e)}>
      <div className="title-search">
        <Label>by Title:</Label>
        <Input
          full
          type="text"
          name="title"
          value={state.title}
          onChange={handleInputChange}
        />
      </div>

      <div className="tag-category-wrapper">
        <div className="tag-search">
          <Label>by Tags:</Label>
          <Input
            full
            type="text"
            name="tags"
            value={state.tags}
            onChange={handleInputChange}
          />
          <p>separate tags with commas</p>
        </div>

        <div className="category-search">
          <Label>by Category:</Label>
          <Select
            full
            name="category"
            onChange={handleInputChange}
            value={state.categoryId}
          >
            <option value="None">None</option>
            {categories.map((c, i) => {
              if (c.name !== 'None')
                return <option key={`cat-${i}`} value={c.id}>{c.name}</option>
            })}
          </Select>
        </div>
      </div>

      <div className="date-search">
        <Label>by Date:</Label>

        <div className="date-inputs">
          <div className="start-date">
            <Label>start:</Label>
            <Input
              full
              type="date"
              name="startDate"
              value={state.startDate}
              onChange={handleInputChange}
            />
          </div>

          <div className="end-date">
            <Label>end:</Label>
            <Input
              full
              type="date"
              name="endDate"
              value={state.endDate}
              onChange={handleInputChange}
            />
          </div>

          <input hidden type="submit"/>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
