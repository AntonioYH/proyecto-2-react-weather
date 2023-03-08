// function for changing to either dark mode or light mode automatically through local storage
export const LSG = () => {
  if (
    window.matchMedia('(prefers-color-scheme: dark)').matches ||
    localStorage.theme !== undefined
  ) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      if (localStorage.theme !== 'light') {
        document.documentElement.classList.toggle('dark');
        document.querySelector('body').classList.toggle('bodyDark');
        document.querySelector('#round').classList.toggle('roundDark');
        localStorage.theme = 'dark';
      }
    } else if (localStorage.theme === 'dark') {
      document.documentElement.classList.toggle('dark');
      document.querySelector('body').classList.toggle('bodyDark');
      document.querySelector('#round').classList.toggle('roundDark');
    }
  }
};

// function for changing to either dark mode or light mode manually
export const toggleDarkMode = () => {
  if (
    localStorage.theme === undefined ||
    (localStorage.theme === 'light' &&
      !document.documentElement.classList.contains('dark'))
  ) {
    document.documentElement.classList.toggle('dark');
    document.querySelector('body').classList.toggle('bodyDark');
    document.querySelector('#round').classList.toggle('roundDark');
    localStorage.theme = 'dark';
  } else if (
    localStorage.theme === 'dark' &&
    document.documentElement.classList.contains('dark')
  ) {
    document.documentElement.classList.toggle('dark');
    document.querySelector('body').classList.toggle('bodyDark');
    document.querySelector('#round').classList.toggle('roundDark');
    localStorage.theme = 'light';
  }
};
