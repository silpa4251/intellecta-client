import styled from "styled-components";

const SelectClassButton = () => {
  return (
    <StyledWrapper>
      <div className="select">
        <div
          className="selected"
          data-default="All"
          data-one="class-1"
          data-two="class-2"
          data-three="class-3"
          data-four="class-4"
          data-five="class-5"
          data-six="class-6"
          data-seven="class-7"
          data-eight="class-8"
          data-nine="class-9"
          data-ten="class-10"
          data-eleven="class-11"
          data-twelve="class-12"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
            className="arrow"
          >
            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
          </svg>
        </div>
        <div className="classes">
          <div title="all">
            <input id="all" name="class" type="radio" defaultChecked />
            <label className="class" htmlFor="all" data-txt="All" />
          </div>
          <div title="class-1">
            <input id="class-1" name="class" type="radio" />
            <label className="class" htmlFor="class-1" data-txt="class-1" />
          </div>
          <div title="class-2">
            <input id="class-2" name="class" type="radio" />
            <label className="class" htmlFor="class-2" data-txt="class-2" />
          </div>
          <div title="class-3">
            <input id="class-3" name="class" type="radio" />
            <label className="class" htmlFor="class-3" data-txt="class-3" />
          </div>
          <div title="class-4">
            <input id="class-4" name="class" type="radio" />
            <label className="class" htmlFor="class-4" data-txt="class-4" />
          </div>
          <div title="class-5">
            <input id="class-5" name="class" type="radio" />
            <label className="class" htmlFor="class-5" data-txt="class-5" />
          </div>
          <div title="class-6">
            <input id="class-6" name="class" type="radio" />
            <label className="class" htmlFor="class-6" data-txt="class-6" />
          </div>
          <div title="class-7">
            <input id="class-7" name="class" type="radio" />
            <label className="class" htmlFor="class-7" data-txt="class-7" />
          </div>
          <div title="class-8">
            <input id="class-8" name="class" type="radio" />
            <label className="class" htmlFor="class-8" data-txt="class-8" />
          </div>
          <div title="class-9">
            <input id="class-9" name="class" type="radio" />
            <label className="class" htmlFor="class-9" data-txt="class-9" />
          </div>
          <div title="class-10">
            <input id="class-10" name="class" type="radio" />
            <label className="class" htmlFor="class-10" data-txt="class-10" />
          </div>
          <div title="class-11">
            <input id="class-11" name="class" type="radio" />
            <label className="class" htmlFor="class-11" data-txt="class-11" />
          </div>
          <div title="class-12">
            <input id="class-12" name="class" type="radio" />
            <label className="class" htmlFor="class-12" data-txt="class-12" />
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
.select {
  position: relative;
  width: fit-content;
  cursor: pointer;
  transition: 300ms;
  color: white;
  overflow: visible;
  z-index: 10;]
}

  .selected {
    background-color: #2a2f3b;
    padding: 5px;
    margin-bottom: 3px;
    border-radius: 5px;
    position: relative;
    z-index: 100000;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .arrow {
    position: relative;
    right: 0px;
    height: 10px;
    transform: rotate(-90deg);
    width: 25px;
    fill: white;
    z-index: 100000;
    transition: 300ms;
  }

  .classes {
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    padding: 5px;
    position: absolute; /* Keeps dropdown from affecting other elements */
    top: 100%; /* Makes it appear below the selected item */
    left: 0;
    width: 100%; /* Ensures it aligns properly */
    max-height: 200px; /* Set a max height */
    overflow-y: auto; /* Enables scrolling */
    opacity: 0;
    transition: opacity 300ms, transform 300ms;
    transform: translateY(-10px);
    z-index: 1000;
    background-color: #2a2f3b;

        /* Hide scrollbar */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE/Edge */
  }

  .select:hover > .classes {
    opacity: 1;
    transform: translateY(0);
  }

  .select:hover > .selected .arrow {
    transform: rotate(0deg);
  }

  .class {
    border-radius: 5px;
    padding: 5px;
    transition: 300ms;
    background-color: #2a2f3b;
    width: 150px;
    font-size: 15px;
  }
  .class:hover {
    background-color: #323741;
  }

  .classes input[type="radio"] {
    display: none;
  }

  .classes label {
    display: inline-block;
  }
  .classes label::before {
    content: attr(data-txt);
  }

  .classes input[type="radio"]:checked + label {
    display: none;
  }

  .classes input[type="radio"]#all:checked + label {
    display: none;
  }

    .classes::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }

  .select:has(.classes input[type="radio"]#all:checked) .selected::before {
    content: attr(data-default);
  }
  .select:has(.classes input[type="radio"]#class-1:checked) .selected::before {
    content: attr(data-one);
  }
  .select:has(.classes input[type="radio"]#class-2:checked) .selected::before {
    content: attr(data-two);
  }
  .select:has(.classes input[type="radio"]#class-3:checked) .selected::before {
    content: attr(data-three);
  }
  .select:has(.classes input[type="radio"]#class-4:checked) .selected::before {
    content: attr(data-four);
  }
  .select:has(.classes input[type="radio"]#class-5:checked) .selected::before {
    content: attr(data-five);
  }
  .select:has(.classes input[type="radio"]#class-6:checked) .selected::before {
    content: attr(data-six);
  }
  .select:has(.classes input[type="radio"]#class-7:checked) .selected::before {
    content: attr(data-seven);
  }
  .select:has(.classes input[type="radio"]#class-8:checked) .selected::before {
    content: attr(data-eight);
  }
  .select:has(.classes input[type="radio"]#class-9:checked) .selected::before {
    content: attr(data-nine);
  }
  .select:has(.classes input[type="radio"]#class-10:checked) .selected::before {
    content: attr(data-ten);
  }
  .select:has(.classes input[type="radio"]#class-11:checked) .selected::before {
    content: attr(data-eleven);
  }
  .select:has(.classes input[type="radio"]#class-12:checked) .selected::before {
    content: attr(data-twelve);
  }
`;

export default SelectClassButton;
